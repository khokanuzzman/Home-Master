import { StyleSheet } from 'react-native';
import colors from './colors';
import common from './common';
import fontSize from './font.size';


export default StyleSheet.create({
    dFlex: {
        flexDirection: 'row',
        zIndex:-1
    },
    flex: {
        flex: 1
    },
    fGrow: {
        flexGrow: 1
    },
    justifyContentCenter: {
        justifyContent: 'center'
    },
    justifyContentBetween: {
        justifyContent: 'space-between'
    },
    alignItemsCenter: {
        alignItems: 'center'
    },
    alignSelfCenter: {
        alignSelf: 'center'
    },
    alignContentCenter: {
        alignContent: 'center'
    },
    logo: {
        width: '50%',
        height: 50,
        alignSelf: 'center',
        borderRadius: 5,
    },
    headline: {
        textAlign: 'center',
        marginBottom: common.TEN
    },
    copyright: {
        color: colors.PRIMARY,
        paddingTop: common.TWENTEE,
        paddingBottom: common.TEN,
        textAlign: 'center'
    },
    pt15: {
        paddingTop: common.FIFTEEN
    },
    pb15: {
        paddingBottom: common.FIFTEEN
    },
    pt10: {
        paddingTop: common.TEN
    },
    pl10: {
        paddingLeft: common.TEN
    },
    p10: {
        padding: common.TEN
    },
    p20: {
        padding: common.TWENTEE
    },
    mt5: {
        marginTop: common.FIVE
    },
    mr10: {
        marginRight: common.TEN
    },
    mb10: {
        marginBottom: common.TEN
    },
    mt10: {
        marginTop: common.TEN
    },
    mt15: {
        marginTop: common.FIFTEEN
    },
    mt20: {
        marginTop: common.TWENTEE
    },
    mb20: {
        marginBottom: common.TWENTEE
    },
    textCenter: {
        textAlign: 'center'
    },
    textBold: {
        fontWeight: 'bold'
    },
    blur: {
        opacity: 0.6
    },
    scollContainer: {
        flexGrow: 1,
        padding: common.TWENTEE,
        backgroundColor:colors.WHITE
    },
    borderRight: {
        borderRightWidth: 1,
        borderColor: '#F1F2F6',
    },
    buttonWrapper: {
        width: '100%',
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 1,
    },
    buttonStyle: {
        width: '100%',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 0,
        paddingVertical:common.FIVE,
    },
    imgLoader: {
        position: 'absolute',
        left: '0%',
        bottom:'0%',
        zIndex: 99999,
        backgroundColor: colors.GREEN,
        width: 60,
        height: 60,
        borderRadius: 50,
        opacity:0.5,
        
    },
    customBarStyle: {
        alignItems:'flex-start'
    },
    customBarTitleStyle:{ fontSize: fontSize.M, color: colors.GREEN, textAlign: 'center',left:-common.TWENTEE},
    budgetAlert:{
        backgroundColor:colors.DRAWER_BACKGROUND,
        padding:common.TEN,
        margin:common.TWENTEE,
        borderRadius:common.TEN
    }
});