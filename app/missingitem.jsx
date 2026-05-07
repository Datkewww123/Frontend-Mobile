import {Text, View, ScrollView, TouchableOpacity,StyleSheet,Alert} from 'react-native';
import {useState} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context';
import {router} from 'expo-router';
import {COLORS} from '../constants/colors';
import { LayoutAnimation } from 'react-native';

const reasons = [
    {
        id: 'empty', icon:'📦' , label:'Kệ còn trống - hàng chưa được bổ sung'
    },
    {
        id: 'damage', icon:'🚫', label:'Hàng đã bị hỏng / Không đạt chất lượng tiêu chuẩn'
    },
    {
        id:'moved', icon:'🔄',label: 'Hàng đã rời khỏi vị trí'
    }
]

export default function MissingItemScreen(){
        const [photoTaken, setPhotoTaken] = useState(false);
        const [reason, setReason] = useState(null);
        function handleSubmit(){
            if(!photoTaken){
                Alert.alert ('Vui lòng chụp màn hình chứng minh trước');
                return;
            }
            if(!reason){
                Alert.alert('Vui lòng chọn lí do thiếu hàng!');
            }
            Alert.alert('Báo cáo đã được gửi thành công');
            router.back();
        }
        return (
        <SafeAreaView style = {styles.safeArea}>
            {/* Header */}
            <View style = {styles.header}>
                <TouchableOpacity onPress = {() => router.back()}>
                    <Text style = {styles.backBtn}>‹</Text>
                </TouchableOpacity>
                <Text style = {styles.headerTitle}>Báo thiếu hàng</Text>
                <View style = {styles.badge}>
                    <Text style = {styles.badgeText}>Kệ 14.07.B</Text>
                </View>
            </View>
            {/* Body */}
            <ScrollView>
            {/* Section chụp ảnh */}
            <Text style = {styles.sectionLabel}>
                CHỤP ẢNH MINH CHỨNG
            </Text>
            {/* Khung giả camera */}
            <TouchableOpacity 
            style = {styles.cameraBox}
            onPress = {() => setPhotoTaken(true)}>
                {
                    photoTaken ? (
                        <View style = {styles.photoDone}>
                            <Text style = {styles.photoDoneIcon}>✅</Text>
                            <Text style = {styles.photoDoneText}>Đã chụp ảnh</Text>
                        </View>
                    ):
                    (
                        <View style ={styles.cameraInner}>
                            <Text style = {styles.cameraTitle}>Chụp ảnh vị trí trống</Text>
                            <Text style = {styles.cameraSub}>Hướng camera vào kệ hàng đang trống</Text>
                            <View style = {styles.cameraBtn}>
                                <Text style = {styles.cameraBtnIcon}>📸</Text>
                            </View>
                        </View>
                    )
                }
            </TouchableOpacity>
            {/* Khu vực để chọn lí do */}
            <Text style = {styles.sectionLabel}>Lí do thiếu hàng:</Text>
            {/* Danh sách li do thiếu hàng, dùng map thay vì flatlist vì chỉ có 3 item */}
                {reasons.map((item)=> (
                    <TouchableOpacity
                    key = {item.id}
                    style = {[styles.reasonOption, reason === item.id && styles.reasonSelected]}
                    onPress = {() => setReason(item.id)}>
                    <Text style = {styles.reasonIcon}>{item.icon}</Text>
                    <Text style = {[styles.reasonLabel  , reason === item.id && styles.reasonLabelSelected]}>{item.label}</Text>
                    </TouchableOpacity>
                ))}
            {/* Nút gửi báo cáo */}
            <TouchableOpacity
            style = {styles.btnSubmit}
            onPress = {handleSubmit}>
                <Text style = {styles.btnSubmitText}>Gửi báo cáo</Text>
            </TouchableOpacity>
            </ScrollView>
            {/* Bottom nav */}
                <View style = {styles.bottomNav}>
                <TouchableOpacity style ={styles.navItem}>
                    <Text style = {styles.navIcon}>🏠</Text>
                    <Text style ={[styles.navLabel]}>Trang Chủ</Text>
                </TouchableOpacity>
                <TouchableOpacity style ={styles.navItem}>
                    <Text style = {styles.navIcon}>📦</Text>
                    <Text style = {[styles.navLabel, styles.navActive]}>Đơn hàng</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => router.push('/packing')}>
                    <Text style ={styles.navIcon}>📷</Text>
                    <Text style ={[styles.navLabel]}>Quét mã</Text>
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
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f0f4f1',
    },

    // Header
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: COLORS.primary,
    },
    backBtn: {
        fontSize: 28,
        color: '#fff',
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
    },
    badge: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },
    badgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },

    scroll: {
        flex: 1,
        padding: 16,
    },

    // Section label
    sectionLabel: {
        fontSize: 11,
        fontWeight: '700',
        color: '#888',
        letterSpacing: 0.5,
        marginBottom: 10,
        marginTop: 4,
    },

    // Khung camera
    cameraBox: {
        backgroundColor: '#0d2b1a',
        borderRadius: 16,
        height: 180,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    cameraInner: {
        alignItems: 'center',
        gap: 8,
    },
    cameraTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '800',
        textAlign: 'center',
    },
    cameraSub: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 12,
        textAlign: 'center',
    },
    cameraBtn: {
        marginTop: 8,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: COLORS.accent,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    cameraBtnIcon: { fontSize: 24 },
    photoDone: {
        alignItems: 'center',
        gap: 8,
    },
    photoDoneIcon: { fontSize: 40 },
    photoDoneText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },

    // Lý do
    reasonOption: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 14,
        padding: 16,
        marginBottom: 10,
        gap: 12,
        borderWidth: 1.5,
        borderColor: '#eee',
    },
    reasonSelected: {
        borderColor: '#e53935',
        backgroundColor: '#fff5f5',
    },
    reasonIcon: { fontSize: 22 },
    reasonLabel: {
        flex: 1,
        fontSize: 14,
        color: '#444',
        fontWeight: '500',
    },
    reasonLabelSelected: {
        color: '#e53935',
        fontWeight: '700',
    },

    // Nút submit
    btnSubmit: {
        backgroundColor: '#e53935',
        margin: 16,
        marginTop: 8,
        borderRadius: 16,
        padding: 18,
        alignItems: 'center',
    },
    btnSubmitText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '800',
    },

    // Bottom Nav
    bottomNav: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
    },
    navIcon: { fontSize: 22 },
    navLabel: {
        fontSize: 10,
        color: '#aaa',
        marginTop: 2,
    },
    navActive: {
        color: COLORS.primary,
        fontWeight: '600',
    },
});