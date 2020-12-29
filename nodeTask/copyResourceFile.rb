require 'xcodeproj'
# 需要修改的参数  projectName 项目名称   fileAddress资源路径暂时固定  icon替换的文件目录
# 获取操作project的对象
# projectName = "pushViewTest" 
# ARGV[0] = projectName 
# ARGV[1] = xcodeproj_path
# ARGV[2] = resource_path
# print ARGV[2] , "\n"
# xcodeproj_path = "/Users/mt010/Desktop/DZG_Desktop/打包类/test/pushViewTest/pushViewTest.xcodeproj" ##### 项目文件所在  暂时写死 
# resource_path = "/Users/mt010/Desktop/DZG_Desktop/打包类/test/pushViewTest/pushViewTest"

# xcodeproj_path = File.join("/Users/mt010/Desktop/DZG_Desktop/打包类/test/pushViewTest/pushViewTest.xcodeproj")
projectName = ARGV[0]
xcodeproj_path = ARGV[1]
resource_path = ARGV[2]
$project = Xcodeproj::Project.open(xcodeproj_path)
target = $project.targets.first
$fileAddress = File.join(resource_path, 'res', 'ios2') # 需要做本地文件目录更替的文件

to_group = $project.main_group.find_subpath(File.join(projectName, 'res', 'ios2'), true)    #这里应该用项目内的相对路径 和上面的路径不相同 如何更换目录这里都不用更换 除非更换项目内的文件夹
to_group.set_source_tree('<group>')

# DZG
def addPushEntitlements
    entitlement_path = projectName + "/" + projectName + ".entitlements" #没问题 相对路径
    file = $project.new_file(entitlement_path) #新建一个推送文件  没有问题
    # print "dzgzgzgz ::: : : : :", $project.root_object.attributes['TargetAttributes'] , "\n"
    attributes = {}
    $project.targets.each do |target|
        attributes[target.uuid] = {"SystemCapabilities" => {"com.apple.Push" => {"enabled" => 1}}} #有问题？
        target.add_file_references([file])
        puts "Added to target: " + target.uuid
    end
    print "ddddd" , attributes , "\n"
    $project.root_object.attributes['TargetAttributes'] = attributes #有问题？

    $project.build_configurations.each do |config|
        config.build_settings.store("CODE_SIGN_ENTITLEMENTS", entitlement_path)
    end
    puts "Added entitlements file path: " + entitlement_path
    # $project.recreate_user_schemes
    $project.save
end
# DZG

def copyFileToGruop(fileFromPath,fileToPath)
    FileUtils.copy_entry(fileFromPath,fileToPath)
end

def deleteToGroup(filePath,isRemove)
    if File.directory?(filePath)
        Dir.foreach(filePath) do |subFile|
            if subFile != '.' and subFile != '..' 
                deleteToGroup(File.join(filePath, subFile),true);
            end
        end
        if isRemove
            Dir.rmdir(filePath)
        end
    else
        File.delete(filePath);
    end
end
def addFilesToGroup(project, aTarget, aGroup)
    Dir.foreach(aGroup.real_path) do |entry|
        filePath = File.join(aGroup.real_path, entry)
        # 过滤目录和.DS_Store文件
        if !File.directory?(filePath) && entry != ".DS_Store" then
            # 向group中增加文件引用
            # print "filePath:::::::",filePath,"\n"
            fileReference = aGroup.new_reference(filePath)
            # 如果不是头文件则继续增加到Build Phase中，PB文件需要加编译标志
            if filePath.to_s.end_with?("pbobjc.m", "pbobjc.mm") then
                aTarget.add_file_references([fileReference], '-fno-objc-arc')
            elsif filePath.to_s.end_with?(".m", ".mm", ".cpp") then
                aTarget.source_build_phase.add_file_reference(fileReference, true)
            elsif filePath.to_s.end_with?(".plist") then
                aTarget.resources_build_phase.add_file_reference(fileReference, true)
            end
        # 目录情况下, 递归添加
        elsif File.directory?(filePath) && entry != '.' && entry != '..' then
          hierarchy_path = aGroup.hierarchy_path[1, aGroup.hierarchy_path.length] 
          subGroup = project.main_group.find_subpath(hierarchy_path + '/' + entry, true)
          subGroup.set_source_tree(aGroup.source_tree)
          subGroup.set_path(aGroup.real_path + entry)
          addFilesToGroup(project, aTarget, subGroup)
        end
    end
end

def removeBuildPhaseFilesRecursively(aTarget, aGroup)
    aGroup.files.each do |file|
        if file.real_path.to_s.end_with?(".m", ".mm", ".cpp") then
            aTarget.source_build_phase.remove_file_reference(file)
        elsif file.real_path.to_s.end_with?(".plist") then
            aTarget.resources_build_phase.remove_file_reference(file)
        end
    end
    
    aGroup.groups.each do |group|
        removeBuildPhaseFilesRecursively(aTarget, group)
    end
end

def runScript(target,to_group) #步骤合集
    print("删除目标地址原有文件中.....\n")
    deleteToGroup($fileAddress,false) #复制文件前先将项目工程资源目录下所有文件删除掉  删除文件实体
    copyFileToGruop(File.join('../ResTestGroup'),$fileAddress) #将资源文件复制到ios2目录下 复制文件实体到项目资源目录下  暂时写死
    if !to_group.empty? then
        removeBuildPhaseFilesRecursively(target, to_group)#删除引用
        to_group.clear()#清空引用
    end
    addFilesToGroup($project, target, to_group)
    print("添加文件成功\n")
    $project.save #保存修改
end
def iconReplace
    print("开始替换icon\n")
    iconFiles = Dir["../pushViewTest/Assets.xcassets/AppIcon.appiconset/*"] #暂时写死
    myIconFiles = Dir["./iconFiles/*"]  #暂时写死
    targetProject = File.join('pushViewTest','Assets.xcassets','AppIcon.appiconset')
    #deleteToGroup(targetProject,false) #删除所有文件
    myIconFiles = File.join('iconFiles')
    Dir.foreach(myIconFiles) do |iconFile|
        FileUtils.copy_entry(myIconFiles,targetProject)
    end
    print("icon替换成功\n")
end
#iconReplace #icon替换  需要固定文件 固定格式
runScript(target,to_group) #资源文件替换




