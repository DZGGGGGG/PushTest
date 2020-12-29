require 'xcodeproj'
projectName = ARGV[0]
xcodeproj_path = ARGV[1]
# print projectName ,xcodeproj_path , "\n"
$project = Xcodeproj::Project.open(xcodeproj_path)
entitlement_path = projectName + "/" + projectName + ".entitlements" 
# file = $project.new_file(entitlement_path) 
attributes = {}
$project.targets.each do |target|
    attributes[target.uuid] = {"SystemCapabilities" => {"com.apple.Push" => {"enabled" => 1}}} 
    # target.add_file_references([file])
    puts "Added to target: " + target.uuid
end
$project.root_object.attributes['TargetAttributes'] = attributes

$project.build_configurations.each do |config|
    config.build_settings.store("CODE_SIGN_ENTITLEMENTS", entitlement_path)
end
puts "Added entitlements file path: " + entitlement_path
$project.save