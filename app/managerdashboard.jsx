import { View, Text, StyleSheet,
         ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { COLORS } from '../constants/colors';

// 4 KPI cards
const kpis = [
    { icon: '✅', value: '1,284', label: 'SKU đã pick', color: COLORS.successBg, textColor: COLORS.primary },
    { icon: '👥', value: '8/10',  label: 'NV đang làm', color: '#e3f2fd',        textColor: '#1565c0' },
    { icon: '⚠️', value: '5',     label: 'Báo thiếu',   color: COLORS.warningBg, textColor: '#e65100' },
    { icon: '📦', value: '3',     label: 'Đơn tồn',     color: '#f3e5f5',        textColor: '#7b1fa2' },
];

// Hoàn thành theo khu vực
const zones = [
    { icon: '🍬', name: 'Bánh kẹo',  pct: 87, color: COLORS.primary },
    { icon: '🥤', name: 'Đồ uống',   pct: 95, color: COLORS.primary },
    { icon: '🧴', name: 'Hóa phẩm',  pct: 64, color: COLORS.error   },
    { icon: '🎁', name: 'KM',        pct: 78, color: '#1976d2'},
];

// Sản phẩm thiếu
const shortages = [
    { id: '1', icon: '🥫',
      name: 'Nước tương Chinsu 500ml',
      loc: 'Kệ 14.07.B · Khu Bánh kẹo',
      who: 'mai · 15:28' },
    { id: '2', icon: '🍟',
      name: 'Snack Oishi Tôm 68g',
      loc: 'Kệ 22.08.A · Khu Bánh kẹo',
      who: 'đức · 14:12' },
];
// component KPI card
function KpiCard ({item}){
    return (
        <View style = {[styles.kpiCard, {backgroundColor: item.color}]} >
            <Text style = {styles.kpiIcon}>{item.icon}</Text>
            <Text style = {[styles.kpiValue, {color: item.textColor}]}>{item.value}</Text>
            <Text style = {styles.kpiLabel}>{item.label}</Text>
        </View>
    );
}
// Component cho 1 dòng tiến độ khu vực
function ZoneRow({zone}){
    return(
        <View style = {styles.zoneRow}>
            <Text style = {styles.zoneName}>{zone.icon} {zone.name}</Text>
            <View style = {styles.zoneBar}>
                <View style = {[styles.zoneBarFill, {width: `${zone.pct}%`, backgroundColor: zone.color}]}/> 
            </View>
            <Text style = {[styles.zonePct, {color: zone.color}]} >{zone.pct}%</Text>
        </View>
    );
}
// component cho sản phẩm bị Thiếu
function ShortageItem({item}){
    return(
        <View style={styles.shortageRow}>
            <Text style = {styles.shortageIcon}>{item.icon}</Text>
            <View style = {styles.shortageInfo}>
                <Text style = {styles.shortageName}>{item.name}</Text>
                <Text style = {styles.shortageLoc}>{item.loc}</Text>
            </View>
            <Text style = {styles.shortageWho}>{item.who}</Text>
        </View>
    );
}

export default function ManagerDashboardScreen(){
    return(
        <SafeAreaView style={styles.safeArea}>

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.backBtn}>‹</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Manager Dashboard</Text>
                {/* Live badge */}
                <View style={styles.liveBadge}>
                    <View style={styles.liveDot} />
                    <Text style={styles.liveText}>LIVE</Text>
                </View>
            </View>
            {/* Body */}
            <ScrollView style = {styles.scroll}>
                {/* 4 thẻ card 2x2 */}
                <View style = {styles.kpiGrid}>
                    {kpis.map((item, index) => (
                        <KpiCard key = {index}  item = {item} />
                    ))}
                    </View>
                {/* Hoàn thành theo khu vực */}
                <View style = {styles.card}>
                    <Text style = {styles.cardTitle}>Hoàn thành theo khu vực</Text>
                    {zones.map((zone) => (
                        <ZoneRow key = {zone.name} zone = {zone} />
                    ))}
                </View>
                {/* Alert cảnh báo năng suất làm việc */}
                <View style = {styles.alert}>
                    <Text style = {styles.alertIcon}>⚠️</Text>
                    <View style = {styles.alertBody}>
                        <Text style = {styles.alertTitle}> 2 nhân viên dưới mức năng suất</Text>
                        <Text style={styles.alertSub}>
                            Phạm Thị Mai (43 SKU/h) và Trần Văn Đức (41 SKU/h) đang dưới ngưỡng 50 SKU/h. </Text>
                    </View>
                    </View>
                {/* Sản phẩm còn thiếu */}
                <View style = {styles.card}>
                    <Text style = {styles.cardTitle}>Sản phẩm còn đang thiếu</Text>
                    {shortages.map((item) => (
                        <ShortageItem key = {item.id} item = {item} />
                    ))}
                </View>
            </ScrollView>
             {/* Bottom Navigation Manager */}
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem}>
                    <Text style={styles.navIcon}>📋</Text>
                    <Text style={[styles.navLabel, styles.navActive]}>
                        Dashboard
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Text style={styles.navIcon}>👥</Text>
                    <Text style={styles.navLabel}>Nhân viên</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Text style={styles.navIcon}>📦</Text>
                    <Text style={styles.navLabel}>Đơn hàng</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Text style={styles.navIcon}>⚠️</Text>
                    <Text style={styles.navLabel}>Sự cố</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Text style={styles.navIcon}>⚙️</Text>
                    <Text style={styles.navLabel}>Cài đặt</Text>
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

    // Live badge
    liveBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffebee',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        gap: 5,
    },
    liveDot: {
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: COLORS.error,
    },
    liveText: {
        fontSize: 11,
        fontWeight: '800',
        color: COLORS.error,
    },

    scroll: { flex: 1, padding: 16 },

    // KPI Grid 2x2
    kpiGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginBottom: 12,
    },
    kpiCard: {
        width: '47%',
        borderRadius: 16,
        padding: 14,
        alignItems: 'center',
        gap: 4,
    },
    kpiIcon: { fontSize: 24 },
    kpiValue: {
        fontSize: 26,
        fontWeight: '900',
    },
    kpiLabel: {
        fontSize: 11,
        color: '#888',
        textAlign: 'center',
    },

    // Card
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
        marginBottom: 14,
    },

    // Zone Row
    zoneRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        gap: 10,
    },
    zoneName: {
        fontSize: 13,
        color: '#444',
        width: 90,
    },
    zoneBar: {
        flex: 1,
        height: 8,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        overflow: 'hidden',
    },
    zoneBarFill: {
        height: '100%',
        borderRadius: 10,
    },
    zonePct: {
        fontSize: 13,
        fontWeight: '700',
        width: 36,
        textAlign: 'right',
    },

    // Alert
    alert: {
        flexDirection: 'row',
        backgroundColor: COLORS.warningBg,
        borderRadius: 14,
        padding: 14,
        gap: 10,
        marginBottom: 12,
        borderLeftWidth: 4,
        borderLeftColor: COLORS.warning,
    },
    alertIcon: { fontSize: 22 },
    alertBody: { flex: 1 },
    alertTitle: {
        fontSize: 13,
        fontWeight: '700',
        color: '#e65100',
        marginBottom: 4,
    },
    alertSub: {
        fontSize: 12,
        color: '#666',
        lineHeight: 18,
    },

    // Shortage
    shortageRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#f5f5f5',
        gap: 10,
    },
    shortageIcon: { fontSize: 22 },
    shortageInfo: { flex: 1 },
    shortageName: {
        fontSize: 13,
        fontWeight: '600',
        color: '#222',
    },
    shortageLoc: {
        fontSize: 11,
        color: '#888',
        marginTop: 2,
    },
    shortageWho: {
        fontSize: 11,
        color: '#aaa',
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