import { StyleSheet } from 'react-native';
import colors from '../../constants/common/colors';
import common from '../../constants/common/common';
import fontSize from '../../constants/common/font.size';

export default StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: colors.DASHBOARD_BAKCGROUND
    },
    subtitle: {
        paddingBottom: 20
    },
    headersSectionTopBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: common.TWENTEE,
    },
    headersSection: {
        borderBottomLeftRadius: common.TWENTEE,
        borderBottomRightRadius: common.TWENTEE,
        paddingVertical: common.TEN,
        backgroundColor: colors.BAKCGROUND,
    },
    accounts: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: common.TWENTEE,
        paddingVertical: common.TEN
    },
    balance: {
        fontSize: fontSize.M,
    },
    amountButtonSection: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom:common.TWENTEE
    },
    amount: {
        backgroundColor: colors.GREEN,
        paddingHorizontal: common.TWENTEE,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: common.TEN, borderRadius: 40
    },

    amountIconWrapper: {
        borderRadius: 10,
        backgroundColor: colors.WHITE,
        marginRight: common.FIVE,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerSectionTopBarUser: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    recentTransition:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:common.TWENTEE
    },
    
});