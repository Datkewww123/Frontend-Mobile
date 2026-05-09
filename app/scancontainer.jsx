import {Text, View, StyleSheet, TouchableOpacity,ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {router} from 'expo-router';
import {COLORS} from '../constants/colors';


//Mockdata cho 1 component

const scanData ={
    location: '14.07.B',
    locationDetail: 'Dãy 14 – Kệ 07 – Tầng B · Khu Bánh kẹo',
    sku: 'KF-00456',
    name: 'Nước tương Chinsu 500ml',
    qty:'3',
    unit: 'chai',
     orderId: '#KF-12345',
    client: 'Kingfood Q.7',
    binCode:'Bin-401',
    binLocation:'Hàng 4-cột 1 - Khu xuất hàng', 
    binEmoji: '📦',
}

export default function ScancontainerScreen(){
    return(
        <SafeAreaView style = {styles.safeArea}>
            <View style = {styles.header}>
                <TouchableOpacity onPress = {() => router.back()}>
                    <Text style ={styles.backBtn}>‹</Text>
                </TouchableOpacity>
                <Text style = {styles.headerTitle}>Packing - Bước 2/2</Text>
                <View style ={styles.confirmBadge}>
                    <Text style ={styles.confirmBadgeText}>✅Xác nhận hàng</Text>
                </View>
            </View>
            <ScrollView style={styles.scroll}>
            {/* Banner vị trí kệ */}
            <View style ={styles.locationCard}>
            <Text style = {styles.locationLabel}>📍 Vị trí kệ</Text>
            <Text style ={styles.locationCode}>{scanData.location}</Text>
            <Text style = {styles.locationDetail}>{scanData.locationDetail}</Text>
            {/* Thanh bước 2 đang làm */}
            <View style = {styles.stepRow}>
                <View style ={[styles.stepDot, styles.stepDone]} />
                <View style = {[styles.stepLine, styles.stepLineDone]} />
                <View style = {[styles.stepDot,styles.stepActive]} />
            </View>
             </View>
            {/* Thẻ confirm xác nhận đúng đơn hàng */}
            <View style = {styles.successBanner}>
                <Text style ={styles.successIcon}>✅</Text>
                <View style ={styles.successBody}>
                    <Text style ={styles.successTitle}>Đúng sản phẩm rồi</Text>
                    <Text style ={styles.successSub}>{scanData.name} {scanData.sku} đã được xác nhận</Text>
                </View>
            </View>
            {/* Card thùng bin */}
            <TouchableOpacity
            style={styles.binCard}
            activeOpacity={0.85}
            onPress={() => router.push('/containeraudit')}
>
                <Text style = {styles.binLabel}>Bỏ hàng vào thùng</Text>
                <Text style = {styles.binCode}>{scanData.binCode}</Text>
                <Text style = {styles.binSub}>{scanData.qty} {scanData.unit} - Đơn {scanData.orderId} {scanData.client}</Text>
            </TouchableOpacity>
            {/* Nút quét mã thùng */}
            <TouchableOpacity 
            style ={styles.btnPrimary}
            onPress = {() => router.push('/dashboard')}>
                <Text style ={styles.btnPrimaryText}>QUÉT MÃ THÙNG ĐỂ XÁC NHẬN</Text>
            </TouchableOpacity>
            {/* Sai BIN / Chuyển thùng */}
            <TouchableOpacity
                style={styles.moveBtn}
                onPress={() => router.push('/moveitem')}
            >
                <Text style={styles.moveBtnText}>
                    🔄 Quét nhầm thùng? Chuyển thùng
                </Text>
            </TouchableOpacity>
            {/* Nút quét lại sản phẩm */}
            <TouchableOpacity
            style = {styles.btnOutline}
            onPress = {() => router.back()}>
                <Text style = {styles.btnOutlineText}>Quét lại mã sản phẩm</Text>
            </TouchableOpacity>
            </ScrollView>
            {/* Bottom Navigation */}
            <View style = {styles.bottomNav}>
                <TouchableOpacity style ={styles.navItem} onPress={() => router.push('/dashboard')}>
                    <Text style = {styles.navIcon}>🏠</Text>
                    <Text style ={[styles.navLabel, styles.navActive]}>Trang Chủ</Text>
                </TouchableOpacity>
               <TouchableOpacity style ={styles.navItem}onPress={() => router.push('/team')} >
                    <Text style = {styles.navIcon}>👥</Text>
                    <Text style = {[styles.navLabel, styles.navActive]}>Nhóm</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => router.push('/packing')}>
                    <Text style ={styles.navIcon}>📷</Text>
                    <Text style ={[styles.navLabel, styles.navActive]}>Quét mã</Text>
                </TouchableOpacity>
                    <TouchableOpacity style={styles.navItem} onPress={() => router.push('/setting')}>
                    <Text style={styles.navIcon}>🔧</Text>
                    <Text style={styles.navLabel}>Tiện ích</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}
                        onPress={() => router.push('/profile')}>
                    <Text style={styles.navIcon}>👤</Text>
                    <Text style={styles.navLabel}>Tài khoản</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },

    // Header
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    backBtn: {
        fontSize: 28,
        color: COLORS.text,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.text,
    },
    confirmBadge: {
        backgroundColor: COLORS.accent,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },
    confirmBadgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '700',
    },

    // Banner vị trí kệ
    locationCard: {
        backgroundColor: COLORS.primary,
        borderRadius: 16,
        padding: 16,
        marginBottom: 10,
    },
    locationLabel: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 12,
        marginBottom: 4,
    },
    locationCode: {
        color: '#fff',
        fontSize: 32,
        fontWeight: '900',
        letterSpacing: 2,
    },
    locationDetail: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 12,
        marginTop: 2,
    },
    //thanh quét lại sản phảm
    moveBtn: {
    alignItems: 'center',
    marginBottom: 10,
},

moveBtnText: {
    color: '#e65100',
    fontSize: 13,
    fontWeight: '700',
},

    // Thanh bước
    stepRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 14,
    },
    stepDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: 'rgba(255,255,255,0.3)',
    },
    stepDone: {
        backgroundColor: 'rgba(255,255,255,0.6)',
    },
    stepActive: {
        backgroundColor: '#fff',
    },
    stepLine: {
        flex: 1,
        height: 2,
        backgroundColor: 'rgba(255,255,255,0.3)',
    },
    stepLineDone: {
        backgroundColor: 'rgba(255,255,255,0.6)',
    },

    // Banner SP đúng
    successBanner: {
        backgroundColor: '#e8f5e9',
        borderRadius: 14,
        padding: 14,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 10,
        borderWidth: 1.5,
        borderColor: COLORS.accent,
    },
    successIcon: { fontSize: 28 },
    successBody: { flex: 1 },
    successTitle: {
        fontSize: 14,
        fontWeight: '800',
        color: COLORS.primary,
        marginBottom: 2,
    },
    successSub: {
        fontSize: 12,
        color: '#555',
    },

    // Card BIN
    binCard: {
        backgroundColor: '#1a3a2a',
        borderRadius: 16,
        padding: 18,
        alignItems: 'center',
        marginBottom: 14,
    },
    binLabel: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 12,
        fontWeight: '700',
        marginBottom: 8,
        letterSpacing: 1,
    },
    binCode: {
        color: '#ffd600',
        fontSize: 36,
        fontWeight: '900',
        letterSpacing: 3,
        marginBottom: 6,
    },
    binSub: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 12,
    },

    // Nút chính
    btnPrimary: {
        backgroundColor: COLORS.primary,
        borderRadius: 14,
        padding: 18,
        alignItems: 'center',
        marginBottom: 10,
    },
    btnPrimaryText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '800',
        letterSpacing: 0.5,
    },

    // Nút phụ
    btnOutline: {
        borderRadius: 14,
        padding: 16,
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#ddd',
        backgroundColor: '#fff',
        marginBottom: 14,
    },
    btnOutlineText: {
        color: '#666',
        fontSize: 14,
        fontWeight: '600',
    },

    // Bottom Navigation
  bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingVertical: 10,
        backgroundColor: '#fff',
    },

    navItem: {
        alignItems: 'center',
    },

    navIcon: {
        fontSize: 20,
        marginBottom: 4,
    },

    navLabel: {
        fontSize: 12,
        color: '#666',
    },

    navActive: {
        color: COLORS.primary,
        fontWeight: '700',
    },
    scroll: {
    flex: 1,
}
});
