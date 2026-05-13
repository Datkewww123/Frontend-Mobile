import {Text, View, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {router} from 'expo-router';
import {COLORS} from '../../constants/colors';

// MockData 2 khu vực
const teams = [
    {
        zone: '🍬 Khu Bánh & Kẹo',
        members: [
            {
                id: '1', initials: 'LN', avatarColor: '#e8f5e9',
                avatarText: COLORS.primary,
                name: 'Trần Thị Lan',
                order: 'Đang làm #KF-12345 · 45/52 SKU',
                sku: 72, skuColor: COLORS.primary, status: 'good',
            },
            {
                id: '2', initials: 'TM', avatarColor: '#fff3e0',
                avatarText: '#e65100',
                name: 'Phạm Thị Mai',
                order: '⚠️ Đang làm #KF-12346 · 20/38 SKU',
                sku: 43, skuColor: COLORS.error, status: 'warn',
            },
            {
                id: '3', initials: 'ĐN', avatarColor: '#f3e5f5',
                avatarText: '#7b1fa2',
                name: 'Hoàng Văn Đức',
                order: 'Nghỉ giải lao · Trở lại 15:30',
                sku: null, skuColor: '#aaa', status: 'break',
            },
        ],
    },
    {
        zone: '🥤 Khu Đồ Uống',
        members: [
            {
                id: '4', initials: 'VS', avatarColor: '#e3f2fd',
                avatarText: '#1565c0',
                name: 'Nguyễn Văn Sơn',
                order: 'Đang làm #KF-12347 · 38/40 SKU',
                sku: 61, skuColor: COLORS.primary, status: 'good',
            },
            {
                id: '5', initials: 'MT', avatarColor: '#e8f5e9',
                avatarText: COLORS.primary,
                name: 'Lê Minh Tùng',
                order: 'Hoàn thành #KF-12348 ✅',
                sku: 55, skuColor: COLORS.primary, status: 'good',
            },
        ],
    },
];

// Component dành cho 1 thành viên 
function MemberRow({member}){
    return(
    <View style = {styles.memberRow}>
        {/* Avatar chữ viết tắt */}
        <View style = {[styles.avatar, {backgroundColor: member.avatarColor}]}>
            <Text style = {[styles.avatarText, {color: member.avatarText}]}>{member.initials}</Text>
        </View>
        {/* Tên và đơn hàng */}
        <View style = {styles.memberInfo}>
            <Text style = {styles.memberName}>{member.name}</Text>
            <Text style = {styles.memberOrder}>{member.order}</Text>
        </View>
        {/* SKU/h */}
        <View style = {styles.memberSKU}>
            <Text style= {[styles.skuValue, {color: member.skuColor}]}>{member.sku ?? '-'}</Text>
            <Text style = {styles.skuUnit}>{member.status === 'break' ? 'Nghỉ': 'SKU/h'}</Text>
        </View>
    </View>
    );
}

export default function TeamScreen(){
    return(
        <SafeAreaView style = {styles.safeArea}>
            {/* Headder */}
            <View style = {styles.header}>
                <TouchableOpacity onPress = {() => router.back()}>
                    <Text style = {styles.backBtn}>‹</Text>
                </TouchableOpacity>
                <Text style = {styles.headerTitle}>Team Overview</Text>
                <View style = {styles.badge}>
                    <Text style = {styles.badgeText}>Trưởng nhóm</Text>
                </View>
            </View>
            {/* Body */}
            <ScrollView style = {styles.scroll}>
                {/* Alert tổng quan */}
                <View style = {styles.alert}>
                    <Text style = {styles.alertIcon}>👥</Text>
                    <View style = {styles.alertBody}>
                        <Text style = {styles.alertTitle}>5 nhân viên vẫn còn đang hoạt động</Text>
                        <Text style = {styles.alertSub}>Khu bánh kẹo: 3 Khu Đồ uống: 2 Tổng năng suất: 291 SKU/h</Text>
                    </View>
                </View>
                {/* Danh sách từng khu vực */}
            {teams.map((team) => (
                <View key = {team.zone} style = {styles.card}>
                    <Text style = {styles.cardTitle}>{team.zone}</Text>
                    {team.members.map((member) => (
                        <MemberRow key = {member.id} member ={member}/>
                    ))}
                </View>
            ))}
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
    badge: {
        backgroundColor: '#e3f2fd',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },
    badgeText: {
        color: '#1565c0',
        fontSize: 12,
        fontWeight: '600',
    },

    scroll: { flex: 1, padding: 16 },

    // Alert
    alert: {
        flexDirection: 'row',
        backgroundColor: COLORS.successBg,
        borderRadius: 14,
        padding: 14,
        gap: 10,
        marginBottom: 16,
        borderLeftWidth: 4,
        borderLeftColor: COLORS.accent,
    },
    alertIcon: { fontSize: 24 },
    alertBody: { flex: 1 },
    alertTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: COLORS.primary,
        marginBottom: 4,
    },
    alertSub: {
        fontSize: 12,
        color: '#555',
        lineHeight: 18,
    },

    // Card khu vực
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#222',
        marginBottom: 12,
    },

    // Member Row
    memberRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#eee',
        gap: 12,
    },

    // Avatar
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        fontSize: 14,
        fontWeight: '800',
    },

    // Thông tin thành viên
    memberInfo: { flex: 1 },
    memberName: {
        fontSize: 13,
        fontWeight: '600',
        color: '#222',
    },
    memberOrder: {
        fontSize: 12,
        color: '#888',
        marginTop: 2,
    },

    // SKU/h
    memberSku: { alignItems: 'flex-end' },
    skuValue: {
        fontSize: 20,
        fontWeight: '800',
    },
    skuUnit: {
        fontSize: 10,
        color: '#aaa',
        marginTop: 1,
    },
});