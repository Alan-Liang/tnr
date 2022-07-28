export default {
  ssr: false,
  target: 'static',
  head: {
    title: 'Traps N\' Roads Remastered - KEEER',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
  },
  components: true,
  // router: {
  //   base: '/tnr/',
  // },
}
