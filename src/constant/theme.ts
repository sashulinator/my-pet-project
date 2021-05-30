/* eslint-disable max-classes-per-file */
import color from 'color'

class DefaultTheme {
  [key: string]: string | number

  constructor() {
    // Color
    this.name = 'Светлая тема'

    this.primary = '#50ACD5'
    this.primaryLighten1 = color(this.primary).lighten(0.1).toString()
    this.primaryLighten2 = color(this.primary).lighten(0.2).toString()
    this.primaryLighten3 = color(this.primary).lighten(0.3).toString()
    this.primaryLighten4 = color(this.primary).lighten(0.4).toString()
    this.primaryLighten5 = color(this.primary).lighten(0.5).toString()
    this.primaryLighten6 = color(this.primary).lighten(0.6).toString()
    this.primaryLighten7 = color(this.primary).lighten(0.7).toString()
    this.primaryDarken1 = color(this.primary).darken(0.1).toString()
    this.primaryDarken2 = color(this.primary).darken(0.2).toString()
    this.primaryDarken3 = color(this.primary).darken(0.3).toString()
    this.primaryDarken4 = color(this.primary).darken(0.4).toString()
    this.primaryDarken5 = color(this.primary).darken(0.5).toString()
    this.primaryDarken6 = color(this.primary).darken(0.6).toString()
    this.primaryDarken7 = color(this.primary).darken(0.7).toString()

    this.colorOnPrimaryBg = 'white'
    this.primaryTransparent2 = '#50add533'
    this.black = '#1B2731'
    this.white = '#FFFFFF'
    this.gray = '#CFD2D6'
    this.red = '#ff5c5c'
    this.lightGray = '#EEEDEE'
    this.darkGray = '#868E98'

    this.color = '#1B2731'
    this.colorDim = this.darkGray

    // Backgrounds
    this.background = 'white'
    this.blurBackground = '#ffffffd3'
    this.bg = 'rgb(245 245 245)'
    this.bgDark = '#101115'
    this.primaryBackdrop = '#50acd5b3'

    // Sider

    this.siderBg = '#101115'

    // margin

    this.marginXxs = 0.5
    this.marginXs = 1
    this.marginS = 2
    this.margin = 4
    this.marginL = 8

    // Form item
    this.formItemHeight = '4rem'
    this.formItemBorderColor = '#CFD2D6'
    this.formItemColor = '000'
    this.formItemPlaceholderColor = 'gray'
    this.formItemBg = 'white'

    // todo remove
    this.borderColor = '#CFD2D6'

    // todo unused
    this.checkboxCheckedBorder = this.primary
    this.checkboxHoverBg = this.primaryLighten6
    this.checkboxBg = 'transparent'
    this.checkboxPlaceholderColor = this.primaryDarken3
    this.checkboxIconColor = this.primary

    this.checkboxCheckedBg = this.primaryLighten1
    this.checkboxCheckedHoverBg = this.primaryLighten2
    this.checkboxCheckedIconColor = this.white
    this.checkboxCheckedPlaceholderColor = this.white
    // Animation
    this.appPageSwitchAnimation = 100

    this.siderCollapsedWidth = 8
    this.headerHeight = 8
    this.siderUncollapsedWidth = 24

    // Other
    this.carImageWidth = 27
    this.carImageHeight = 27 / 1.6
  }
}

class DarkTheme extends DefaultTheme {
  constructor() {
    super()

    this.name = 'Темная тема'
    this.skeletonBg = '#243848'
    this.skeletonColor = '#3b5062'
    this.outlineColor = 'yellow'
    // this.primary= 'green'
    this.blurBackground = '#1a2731d9'

    this.checkboxUncheckedbg = '#2f4250'
    this.lightBackground = '#2f4250'

    // Form item
    this.formItemColor = 'lightgray'
    this.formItemPlaceholderColor = '#34647c'
    this.formItemBorderColor = '#34647c'
    this.formItemBg = this.black

    this.checkboxCheckedBg = this.primaryDarken3
    this.checkboxHoverBg = '#2f4a5f'
    this.checkboxPlaceholderColor = this.formItemPlaceholderColor

    // todo remove
    this.borderColor = '#34647c'

    this.siderBg = color('#2f4250').darken(0.5).toString()

    this.color = '#dedede'

    this.background = this.black
  }
}

const theme = {
  defaultTheme: new DefaultTheme(),
  darkTheme: new DarkTheme(),
}

export default theme
