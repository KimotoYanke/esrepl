<template>
  <div id="app">
    <editor v-model="code" lang="javascript" theme="solarized_dark" class="editor" @init="initEditor"></editor>
    <editor :value="output" theme="solarized_dark" class="editor"></editor>
  </div>
</template>

<script>
const code = (() => {
  if (location.hash.length > 1) {
    return decodeURI(location.hash.slice(1))
  } else {
    return `console.log("Hello, world")`
  }
})()

export default {
  name: 'app',
  data () {
    return {
      code
    }
  },
  methods: {
    initEditor: editor => {
      require('brace/mode/javascript')
      require('brace/theme/solarized_dark')
    },
    newEval: code => {
      const wrappedCode = (`
      var _log = ''; var _olog = console.log;
      console.log = function () {
        if(_log){
          _log += '\\n';
        }
        _olog.apply(null, arguments);
        _log += Array.from(arguments).map(JSON.stringify).join(', ');
      };
      ${code}; 
      _log;`)
      return eval(wrappedCode)
    }
  },
  computed: {
    output () {
      try {
        return String(this.newEval(this.code))
      } catch (e) {
        return String(e)
      }
    }
  }
}
</script>

<style>
html, body, #app {
  height: 100%;
  width: 100%;
  margin: 0px;
  display: flex;
  flex-direction: row;
}

.editor {
  height: 100%;
  width: 50%;
}
</style>
