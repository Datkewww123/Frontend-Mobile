import {useState} from 'react';
import { router } from 'expo-router';
import{
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import {COLORS} from '../constants/colors'
export default function DashboardScreen(){
    return(
       <SafeAreaView style={styles.safeArea}>

            {/* PHẦN 1: BANNER CA LÀM VIỆC */}
            <View style={styles.banner}>

                {/* Tên và khu vực */}
                <View style={styles.bannerTop}>
                    <View>
                        <Text style={styles.greeting}>Xin chào 👋</Text>
                        <Text style={styles.name}>Phạm Thị Mai</Text>
                        <Text style={styles.zone}>🍬 Khu Bánh & Kẹo</Text>
                    </View>
                    <View style={styles.shiftTime}>
                        <Text style={styles.shiftLabel}>Ca</Text>
                        <Text style={styles.shiftValue}>08:00–16:00</Text>
                    </View>
                </View>

                {/* 3 chỉ số KPI */}
                <View style={styles.kpiRow}>
                    <View style={styles.kpiItem}>
                        <Text style={styles.kpiValue}>12</Text>
                        <Text style={styles.kpiLabel}>Đơn hàng</Text>
                    </View>
                    <View style={styles.kpiDivider}/>
                    <View style={styles.kpiItem}>
                        <Text style={styles.kpiValue}>89%</Text>
                        <Text style={styles.kpiLabel}>Hoàn thành</Text>
                    </View>
                    <View style={styles.kpiDivider}/>
                    <View style={styles.kpiItem}>
                        <Text style={styles.kpiValue}>45</Text>
                        <Text style={styles.kpiLabel}>SKU/h</Text>
                    </View>
                </View>

            </View>

            {/* PHẦN 2: DANH SÁCH ĐƠN HÀNG */}
            <ScrollView style={styles.scroll}>
                <Text style={styles.sectionTitle}>📦 Đơn hàng hôm nay</Text>

                {/* Đơn hàng 1 - Đang làm */}
                <TouchableOpacity 
                    style={styles.orderCard}
                    onPress={() => router.push('/productlist')}>
                    <View style={styles.orderHead}>
                        <View>
                            <Text style={styles.orderId}>#KF-12345</Text>
                            <Text style={styles.orderStore}>Kingfood Nguyễn Văn Linh, Q.7</Text>
                        </View>
                        <View style={[styles.statusTag, styles.statusOrange]}>
                            <Text style={styles.statusText}>Đang làm</Text>
                        </View>
                    </View>
                    <View style={styles.orderFooter}>
                        <Text style={styles.skuText}>45/52 SKU</Text>
                        <View style={styles.progressBar}>
                            <View style={[styles.progressFill, { width: '87%' }]}/>
                        </View>
                        <Text style={styles.pctText}>87%</Text>
                    </View>
                </TouchableOpacity>

                {/* Đơn hàng 2 - Xong */}
               <TouchableOpacity 
                        style={styles.orderCard}
                        onPress={() => router.push('/productlist')}
                    >
                    <View style={styles.orderHead}>
                        <View>
                            <Text style={styles.orderId}>#KF-12346</Text>
                            <Text style={styles.orderStore}>Kingfood Đinh Tiên Hoàng, Q.1</Text>
                        </View>
                        <View style={[styles.statusTag, styles.statusGreen]}>
                            <Text style={styles.statusText}>Xong</Text>
                        </View>
                    </View>
                    <View style={styles.orderFooter}>
                        <Text style={styles.skuText}>38/38 SKU</Text>
                        <View style={styles.progressBar}>
                            <View style={[styles.progressFill, { width: '100%', backgroundColor: COLORS.accent }]}/>
                        </View>
                        <Text style={styles.pctText}>100%</Text>
                    </View>
                </TouchableOpacity>

                {/* Đơn hàng 3 - Chờ */}
               <TouchableOpacity 
                        style={styles.orderCard}
                        onPress={() => router.push('/productlist')}
                    >
                    <View style={styles.orderHead}>
                        <View>
                            <Text style={styles.orderId}>#KF-12347</Text>
                            <Text style={styles.orderStore}>Kingfood Lê Văn Việt, Q.9</Text>
                        </View>
                        <View style={[styles.statusTag, styles.statusGray]}>
                            <Text style={styles.statusText}>Chờ</Text>
                        </View>
                    </View>
                    <View style={styles.orderFooter}>
                        <Text style={styles.skuText}>0/44 SKU</Text>
                        <View style={styles.progressBar}>
                            <View style={[styles.progressFill, { width: '0%' }]}/>
                        </View>
                        <Text style={[styles.pctText, { color: '#aaa' }]}>0%</Text>
                    </View>
                </TouchableOpacity>

            </ScrollView>
            <View style = {styles.bottomNav}>
                <TouchableOpacity style ={styles.navItem}>
                    <Text style = {styles.navIcon}>🏠</Text>
                    <Text style ={[styles.navLabel, styles.navActive]}>Trang Chủ</Text>
                </TouchableOpacity>
                <TouchableOpacity style ={styles.navItem}>
                    <Text style = {styles.navIcon}>📦</Text>
                    <Text style = {[styles.navLabel, styles.navActive]}>Đơn hàng</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.navItem}>
                    <Text style ={styles.navIcon}>📷</Text>
                    <Text style ={[styles.navLabel, styles.navActive]}>Quét mã</Text>
                </TouchableOpacity>
                    <TouchableOpacity style={styles.navItem}>
                    <Text style={styles.navIcon}>🔧</Text>
                    <Text style={styles.navLabel}>Tiện ích</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Text style={styles.navIcon}>👤</Text>
                    <Text style={styles.navLabel}>Tài khoản</Text>
                </TouchableOpacity>
            </View>
            </SafeAreaView>
)}
const styles = StyleSheet.create({

    // Màn hình tổng
    safeArea: {
        flex: 1,
        backgroundColor: '#f0f4f1',
    },

    // Banner xanh phía trên
    banner: {
        backgroundColor: COLORS.primary,
        padding: 20,
        paddingBottom: 24,
    },
    bannerTop: {
        flexDirection: 'row',        // xếp 2 thứ nằm ngang
        justifyContent: 'space-between', // đẩy ra 2 đầu
        marginBottom: 20,
    },
    greeting: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 13,
    },
    name: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '700',
        marginTop: 2,
    },
    zone: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 13,
        marginTop: 4,
    },
    shiftTime: {
        alignItems: 'flex-end',     // căn phải
    },
    shiftLabel: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 12,
    },
    shiftValue: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },

    // 3 chỉ số KPI
    kpiRow: {
        flexDirection: 'row',        // 3 ô nằm ngang
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 16,
        padding: 14,
    },
    kpiItem: {
        flex: 1,                     // chia đều 3 ô
        alignItems: 'center',
    },
    kpiValue: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '800',
    },
    kpiLabel: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 11,
        marginTop: 2,
    },
    kpiDivider: {
        width: 1,
        backgroundColor: 'rgba(255,255,255,0.2)',
    },

    // Vùng cuộn đơn hàng
    scroll: {
        flex: 1,
        padding: 16,
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: COLORS.primary,
        marginBottom: 12,
    },

    // Thẻ đơn hàng
    orderCard: {
        backgroundColor: '#fff',
        borderRadius: 16,            // bo góc nhiều như em muốn
        padding: 14,
        marginBottom: 10,
        shadowColor: '#000',         // đổ bóng
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,                // đổ bóng trên Android
    },
    orderHead: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    orderId: {
        fontSize: 14,
        fontWeight: '700',
        color: '#222',
    },
    orderStore: {
        fontSize: 12,
        color: '#888',
        marginTop: 2,
    },

    // Tag trạng thái
    statusTag: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },
    statusOrange: { backgroundColor: '#fff7e0' },
    statusGreen:  { backgroundColor: '#e8f5e9' },
    statusGray:   { backgroundColor: '#f5f5f5' },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#555',
    },

    // Thanh tiến độ
    orderFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    skuText: {
        fontSize: 12,
        color: '#888',
        width: 60,
    },
    progressBar: {
        flex: 1,
        height: 6,
        backgroundColor: '#eee',
        borderRadius: 10,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: COLORS.primaryLight,
        borderRadius: 10,
    },
    pctText: {
        fontSize: 12,
        fontWeight: '600',
        color: COLORS.primary,
        width: 36,
        textAlign: 'right',
    },

    // Bottom Navigation
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
    navIcon: {
        fontSize: 22,
    },
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