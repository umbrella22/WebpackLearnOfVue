/**
 * The file enables `@/store/index.js` to import all vuex modules
 * in a one-shot manner. There should not be any reason to edit this file.
 */
// 这里是默认将modules中的所有非index的文件对外导出，一般情况不用修改
// 在你新建了一个文件之后，你需要立马去完善该文件夹内的内容，如果只是一个空的文件，将会导致vuex报错
const files = require.context('.', false, /\.js$/)
const modules = {}

files.keys().forEach(key => {
  if (key === './index.js') return
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

export default modules