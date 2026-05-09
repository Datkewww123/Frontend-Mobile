import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { COLORS } from '../constants/colors';


const pickList = [
    {
        id: 1,
        shelf: 'Kệ 12.03.A',
        product: 'Bánh quy Hải Hà x5',
        distance: 'Đã xong',
        done: true,
    },
    {
        id: 2,
        shelf: 'Kệ 14.07.B',
        product: 'Nước tương Chinsu 500ml x3',
        distance: '~15m →',
        active: true,
    },
    {
        id: 3,
        shelf: 'Kệ 26.10.C',
        product: 'Sữa chua Vinamilk x12',
        distance: '~42m',
    },
    {
        id: 4,
        shelf: 'Kệ 18.02.A',
        product: 'Mì gói Hảo Hảo x20',
        distance: '~28m',
    },
];


// PICK ROW

function PickRow({ item }) {
    return (
        <View style={styles.pickRow}>

            <View
                style={[
                    styles.stepCircle,
                    item.done && styles.stepCircleDone,
                    item.active && styles.stepCircleActive,
                ]}
            >
                <Text
                    style={[
                        styles.stepText,
                        item.done && styles.stepTextDone,
                    ]}
                >
                    {item.done ? '✓' : item.id}
                </Text>
            </View>

            <View style={styles.pickInfo}>

                <Text style={styles.pickShelf}>
                    {item.shelf}
                </Text>

                <Text style={styles.pickProduct}>
                    {item.product}
                </Text>

            </View>

            <Text
                style={[
                    styles.pickDistance,
                    item.done && styles.pickDone,
                ]}
            >
                {item.distance}
            </Text>

        </View>
    );
}


// BOTTOM TAB

function BottomTab({
    icon,
    label,
    active,
}) {
    return (
        <TouchableOpacity style={styles.tabItem}>

            <Text style={styles.tabIcon}>
                {icon}
            </Text>

            <Text
                style={[
                    styles.tabLabel,
                    active && styles.tabLabelActive,
                ]}
            >
                {label}
            </Text>

        </TouchableOpacity>
    );
}


// MAIN SCREEN

export default function RouteOptimizationScreen() {
    return (
        <SafeAreaView style={styles.safeArea}>

            {/* Header */}
            <View style={styles.header}>

                <TouchableOpacity
                    onPress={() => router.back()}
                >
                    <Text style={styles.backBtn}>‹</Text>
                </TouchableOpacity>

                <Text style={styles.headerTitle}>
                    Lộ trình Tối ưu
                </Text>

                <View style={styles.savedBadge}>
                    <Text style={styles.savedText}>
                        ↓ 320m
                    </Text>
                </View>

            </View>


            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >

                {/* Alert */}
                <View style={styles.alertCard}>

                    <Text style={styles.alertIcon}>
                        🗺️
                    </Text>

                    <View style={styles.alertBody}>

                        <Text style={styles.alertTitle}>
                            Lộ trình đã tối ưu!
                        </Text>

                        <Text style={styles.alertSub}>
                            Thứ tự pick theo địa lý giúp bạn
                            đi ít hơn 320m, tiết kiệm ~4 phút/chuyến.
                        </Text>

                    </View>

                </View>


                {/* Map */}
                <View style={styles.mapCard}>

                    <View style={styles.gridOverlay}>

                        {/* Kệ */}
                        <View style={[
                            styles.shelf,
                            {
                                top: 20,
                                left: 18,
                            },
                        ]}>
                            <Text style={styles.shelfText}>
                                Kệ 12
                            </Text>
                        </View>

                        <View style={[
                            styles.shelfActive,
                            {
                                top: 18,
                                left: 90,
                            },
                        ]}>
                            <Text style={styles.shelfText}>
                                Kệ 14
                            </Text>
                        </View>

                        <View style={[
                            styles.shelf,
                            {
                                top: 20,
                                left: 180,
                            },
                        ]}>
                            <Text style={styles.shelfText}>
                                Kệ 26
                            </Text>
                        </View>

                        <View style={[
                            styles.shelf,
                            {
                                top: 100,
                                left: 18,
                            },
                        ]}>
                            <Text style={styles.shelfText}>
                                Kệ 18
                            </Text>
                        </View>


                        {/* Route line */}
                        <View style={styles.routeHorizontal1} />
                        <View style={styles.routeHorizontal2} />
                        <View style={styles.routeVertical1} />
                        <View style={styles.routeVertical2} />


                        {/* Worker */}
                        <View style={styles.workerDot}>
                            <View style={styles.workerInner} />
                        </View>

                    </View>

                </View>


                {/* Pick order */}
                <View style={styles.pickCard}>

                    <Text style={styles.pickTitle}>
                        📍 THỨ TỰ PICK
                    </Text>

                    {pickList.map((item) => (
                        <PickRow
                            key={item.id}
                            item={item}
                        />
                    ))}

                </View>

            </ScrollView>


            {/* Bottom Tab */}
            <View style={styles.bottomTab}>

                <BottomTab
                    icon="🏠"
                    label="Trang chủ"
                />

                <BottomTab
                    icon="📦"
                    label="Đơn hàng"
                />

                <BottomTab
                    icon="🗺️"
                    label="Bản đồ"
                    active
                />

                <BottomTab
                    icon="📊"
                    label="Năng suất"
                />

                <BottomTab
                    icon="👤"
                    label="Tài khoản"
                />

            </View>

        </SafeAreaView>
    );
}


const styles = StyleSheet.create({

    safeArea: {
        flex: 1,
        backgroundColor: '#eef2ef',
    },


    // Header
    header: {
        backgroundColor: COLORS.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 14,
    },

    backBtn: {
        color: '#fff',
        fontSize: 28,
    },

    headerTitle: {
        flex: 1,
        marginLeft: 8,
        color: '#fff',
        fontSize: 18,
        fontWeight: '800',
    },

    savedBadge: {
        backgroundColor: '#4ade80',
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
    },

    savedText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '800',
    },


    // Scroll
    scroll: {
        flex: 1,
    },

    scrollContent: {
        padding: 16,
        paddingBottom: 100,
    },


    // Alert
    alertCard: {
        flexDirection: 'row',
        backgroundColor: '#22863a',
        borderRadius: 20,
        padding: 16,
        marginBottom: 14,
        alignItems: 'flex-start',
    },

    alertIcon: {
        fontSize: 30,
        marginRight: 12,
    },

    alertBody: {
        flex: 1,
    },

    alertTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '800',
        marginBottom: 6,
    },

    alertSub: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: 14,
        lineHeight: 22,
    },


    // Map
    mapCard: {
        backgroundColor: '#031b12',
        borderRadius: 22,
        height: 260,
        overflow: 'hidden',
        marginBottom: 14,
    },

    gridOverlay: {
        flex: 1,
        backgroundColor: '#031b12',
    },


    // Shelf
    shelf: {
        position: 'absolute',
        width: 64,
        height: 34,
        borderRadius: 8,
        backgroundColor: '#0f5132',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#1f7a4f',
    },

    shelfActive: {
        position: 'absolute',
        width: 70,
        height: 40,
        borderRadius: 10,
        backgroundColor: '#4caf50',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#7dff93',
    },

    shelfText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '700',
    },


    // Route
    routeHorizontal1: {
        position: 'absolute',
        top: 58,
        left: 48,
        width: 82,
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: '#facc15',
    },

    routeHorizontal2: {
        position: 'absolute',
        top: 58,
        left: 126,
        width: 86,
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: '#facc15',
    },

    routeVertical1: {
        position: 'absolute',
        top: 58,
        left: 212,
        height: 62,
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: '#facc15',
    },

    routeVertical2: {
        position: 'absolute',
        top: 120,
        left: 48,
        height: 74,
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: '#facc15',
    },


    // Worker
    workerDot: {
        position: 'absolute',
        bottom: 22,
        left: 40,
        width: 24,
        height: 24,
        borderRadius: 14,
        backgroundColor: '#e11d48',
        alignItems: 'center',
        justifyContent: 'center',
    },

    workerInner: {
        width: 10,
        height: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
    },


    // Pick Card
    pickCard: {
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 18,
    },

    pickTitle: {
        color: '#888',
        fontSize: 18,
        fontWeight: '800',
        marginBottom: 14,
    },


    // Pick Row
    pickRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        borderBottomWidth: 0.5,
        borderBottomColor: '#ececec',
    },

    stepCircle: {
        width: 34,
        height: 34,
        borderRadius: 18,
        backgroundColor: '#d4d4d4',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },

    stepCircleDone: {
        backgroundColor: '#16a34a',
    },

    stepCircleActive: {
        backgroundColor: '#f59e0b',
    },

    stepText: {
        color: '#666',
        fontWeight: '800',
    },

    stepTextDone: {
        color: '#fff',
    },

    pickInfo: {
        flex: 1,
    },

    pickShelf: {
        fontSize: 18,
        fontWeight: '800',
        color: '#222',
    },

    pickProduct: {
        color: '#999',
        fontSize: 14,
        marginTop: 2,
    },

    pickDistance: {
        color: COLORS.primary,
        fontWeight: '700',
        fontSize: 16,
    },

    pickDone: {
        color: '#16a34a',
    },


    // Bottom Tab
    bottomTab: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,

        backgroundColor: '#fff',

        flexDirection: 'row',
        justifyContent: 'space-around',

        paddingTop: 10,
        paddingBottom: 18,

        borderTopWidth: 1,
        borderTopColor: '#eee',
    },

    tabItem: {
        alignItems: 'center',
        gap: 4,
    },

    tabIcon: {
        fontSize: 24,
    },

    tabLabel: {
        fontSize: 12,
        color: '#999',
        fontWeight: '600',
    },

    tabLabelActive: {
        color: COLORS.primary,
        fontWeight: '800',
    },

});