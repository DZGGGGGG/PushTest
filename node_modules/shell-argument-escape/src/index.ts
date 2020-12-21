export function escape(str: string): string {
    return str.replace(/(#|;|"|'|,|\\|`|\:|\!|\*|\?|\$|\{|\}|@|\(|\)|\[|\]|<|>|\||\=|%|\s)/g, '\\$1')
}