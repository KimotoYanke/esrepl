<template>
  <div id="app">
    <editor v-model="code" lang="javascript" theme="solarized_dark" class="editor" @init="initEditor"></editor>
    <editor :value="output" theme="solarized_dark" class="editor"></editor>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      code: `console.log("Hello, world")`,
    }
  },
  methods: {
    initEditor: editor => {
      require('brace/mode/javascript')
      require('brace/theme/solarized_dark')
    },
    newEval: code => {
      const wrappedCode=(`
      var _log = '';
      var _olog = console.log;
      console.log = function () {
        _olog.apply(null, arguments);
        _log += Array.from(arguments).map(JSON.stringify).join(', ');
        _log += '\\n';
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
