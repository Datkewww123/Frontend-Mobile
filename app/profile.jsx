import {Text, View, TextInput, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet} from 'react-native'
import {router} from 'expo-router'
import {COLORS} from '../constants/colors'
// componet tái sử dụng - tránh phải lặp đi lặp lại code vi phạm DRYƯ
function InfoRow({label, value, valueColor}){
    return(
        <View style = {styles.infoRow}>
            <Text style = {styles.infoLabel}>
                {label}
            </Text>
            <Text style = {[styles.infoValue, valueColor && {color: valueColor}]}>
                {value}
            </Text>
        </View>
    )
}
// Componet tái sử dung cho thành tích
function Achievement ({medal, title, when}){
    return (
        <View style = {styles.achievement}>
            <Text style = {styles.medal}>
                {medal}
            </Text>
            <Text style = {styles.achName}>
                {title}
            </Text>
            <Text style = {styles.achWhen}>
                {when}
            </Text>
        </View>
    )
}
export default function ProfileScreen (){
    return (
        < SafeAreaView style = {styles.safeArea}>
            {/* phần header */}
            <View style = {styles.header}>
                {/* // đợi event chuyển về trang trước đó */}
                <TouchableOpacity onPress ={() => router.back()}>
                    <Text style = {styles.backBtn}>‹</Text>
                    </TouchableOpacity> 
                <Text style = {styles.headerTitle}>
                    Hồ sơ nhân viên
                </Text>
                <Text style = {styles.editBtn}>✏️</Text>
            </View>
            {/*Ava + tên của nhân viên  */}
             <ScrollView style={styles.scroll}>
            <View style = {styles.banner}>
                     <Text style={styles.avatarEmoji}>👷</Text>
                     <Text style={styles.name}>Phạm Thị Mai</Text>
                     <Text style={styles.idText}>Mã NV: KF-NV-042 Ca Sáng</Text>
                 <View style = {styles.badgeRow}>
                        <View style ={styles.badge}>
                        <Text style ={styles.badgeText}>🍬 Bánh & Kẹo </Text>
                     </View>
                     <View style = {styles.badge}>
                        <Text style={styles.badgeText}>⭐ Tháng 3</Text>
                     </View>
                </View>
            </View>
               {/* Thông tin cá nhân của nhân viên  */}
               <View style = {styles.card}>
                <Text style = {styles.cardTitle}>Thông tin cá nhân</Text>
                <InfoRow label = 'Họ và Tên' value ='Phạm Thị Mai'/>
                <InfoRow label = 'Khu vực' value = '🍬 Bánh & Kẹo'/>
                <InfoRow label = 'Ngày vào làm' value = '12/03/2023' />
                <InfoRow label = 'Tổng SKU đã chọn' value = '12,840' />
                <InfoRow label = 'Trung bình năng suất' value ='52 SKU/h'/>
                <InfoRow label ='Số ca đã làm' value = '186 ca'/>
               </View>
               {/* Những ca làm sắp đến của nhân viên */}
               <View style = {styles.card}>
                <Text style = {styles.cardTitle} >
                    Ca làm Sắp tới
                </Text>
                <InfoRow label="Hôm nay (22/04)" value="☀️ Ca Sáng 08:00–16:00" />
                    <InfoRow label="Ngày mai (23/04)" value="🌙 Ca Chiều 16:00–00:00" />
                    <InfoRow label="24/04" value="🏖️ Nghỉ" />
               </View>
               {/* Thành tích của nhân viên này */}
               <View style = {styles.card}>
                <Text style = {styles.cardTitle}>Thành tích đạt được</Text>
                <Achievement medal = '🥇' title = 'Nhân viên xuất sắc T3/2026'when ='Thang 3, 2026' />
                            <Achievement
                        medal="⚡"
                        title="Pick 100 SKU trong 1 giờ"
                        when="15/02/2026"
                    />
               </View>
               {/* Lịch sử picking */}
               {/* Nút lịch sử picking */}
                    <TouchableOpacity
                        style={styles.historyBtn}
                        onPress={() => router.push('/history')}
                    >
                        <Text style={styles.historyBtnText}>
                            🕐 Lịch sử Picking
                        </Text>
                    </TouchableOpacity>
               {/* Nút bàn giao ca */}
                            <TouchableOpacity
                    style={styles.handoverBtn}
                    onPress={() => router.push('/handover')}
                >
                    <Text style={styles.handoverBtnText}>
                        🤝 Bàn giao ca
                    </Text>
                </TouchableOpacity>
               {/* Nút tổng kết ca */}
               <TouchableOpacity 
                style={styles.shiftBtn}
                onPress={() => router.push('/endshift')}
                >
                <Text style={styles.shiftBtnText}>📊 Xem tổng kết ca</Text>
                </TouchableOpacity>
               {/* Nút đổi pin */}
               <TouchableOpacity style = {styles.pinBtn}>
                <Text style = {styles.pinBtnText}> Đổi Pin đăng nhập</Text>
               </TouchableOpacity>
             </ScrollView>
        </SafeAreaView>
    );
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
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    backBtn: {
        fontSize: 28,
        color: COLORS.primary,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#222',
    },
    editBtn: {
        fontSize: 20,
        color: '#aed6b5',
    },

    scroll: { flex: 1 },

    // Banner
    banner: {
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        paddingVertical: 28,
        paddingHorizontal: 16,
    },
    avatarEmoji: {
        fontSize: 60,
        marginBottom: 10,
    },
    name: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '700',
    },
    idText: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 13,
        marginTop: 4,
    },
    badgeRow: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 12,
    },
    badge: {
        backgroundColor: 'rgba(255,255,255,0.15)',
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    badgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },

    // Card
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        margin: 12,
        marginBottom: 0,
        padding: 16,
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#222',
        marginBottom: 12,
    },

    // Info Row
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#eee',
    },
    infoLabel: {
        fontSize: 13,
        color: '#888',
    },
    infoValue: {
        fontSize: 13,
        fontWeight: '600',
        color: '#222',
    },

    // Achievement
    achievement: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#eee',
    },
    medal: { fontSize: 28 },
    achName: {
        fontSize: 13,
        fontWeight: '600',
        color: '#222',
    },
    achWhen: {
        fontSize: 11,
        color: '#888',
        marginTop: 2,
    },

    // Nút đổi PIN
    pinBtn: {
        margin: 12,
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 16,
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#eee',
        marginBottom: 24,
    },
    pinBtnText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
    },
    shiftBtn: {
    margin: 12,
    marginBottom: 0,
    padding: 16,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    alignItems: 'center',
},
shiftBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
},
handoverBtn: {
    marginHorizontal: 12,
    marginTop: 12,

    padding: 16,

    backgroundColor: '#fff',

    borderRadius: 16,

    alignItems: 'center',

    borderWidth: 1.5,
    borderColor: '#dfe7df',
},

handoverBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
},
historyBtn: {
    marginHorizontal: 12,
    marginTop: 12,

    padding: 16,

    backgroundColor: '#fff',

    borderRadius: 16,

    alignItems: 'center',

    borderWidth: 1.5,
    borderColor: '#e5e7eb',
},

historyBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#374151',
},
});