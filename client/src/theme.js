import { createTheme } from '@material-ui/core/styles'

const theme = createTheme({
    // mixins: {
    //   gutters: {
    //   [defaultTheme.breakpoints.up('sm')]: {
    //     paddingLeft: '16px',
    //     paddingRight: '16px',
    //   }}
    // },
    typography: {
      useNextVariants: true,
      fontFamily: [ 'Encode Sans Semi Expanded', 'sans-serif' ].join(','),
    },
    palette: {
      primary: {
      light: '#4361EE',
      // main: '#3A0CA3',
      main: '#3300A6',
      dark: '#2A0878',
      contrastText: '#fff',
    },
    secondary: {
      light: '#52D7FF',
      main: '#4CC9F0',
      dark: '#45B4D6',
      contrastText: '#000',
    },
      openTitle: '#3A0CA3',
      protectedTitle: '#4CC9F0',
      type: 'light'
    },
})

export default theme;