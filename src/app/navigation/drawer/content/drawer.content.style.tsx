import { StyleSheet } from 'react-native';
import colors from '../../../constants/common/colors';
import common from '../../../constants/common/common';
import fontSize from '../../../constants/common/font.size';

export default StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: colors.BAKCGROUND
    },
    headerSection: {
        height: common.SECTION_HEIGHT_200,
        justifyContent: 'center', 
        alignItems: 'center',
        flexDirection:'row'
    },
    itemWrapper: {
        backgroundColor: colors.WHITE,
        borderRadius: common.BORDER_RADIUS_10,
        marginHorizontal: common.TEN
    },
    iconStyle:{
        padding:common.FIFTEEN,
        opacity:common.ACTIVE_OPACITY,
        backgroundColor:'#EEE5FF',
        fontSize:fontSize.L_ICON,
        borderRadius:common.BORDER_RADIUS_10
    }

});