    import {Text, View, TextInput, TouchableOpacity, StyleSheet, FlatList, SafeAreaView} from 'react-native';
    import {COLORS} from '../constants/colors'
    import {router} from 'expo-router'

    // Mảng dữ liệu (Mock Data)
    const products = [
        {
            id: 1, location: '26.10.15', name: 'Bánh Quy Hải Hà 200g', 
            sku: 'KF-00123', qty: 5, unit: 'Hộp', done: true
        },
        {
            id: 2, location: '14.07.B', name:'Nước tương chinsu 500ml',
            sku: 'KF-00456', qty: 3, unit: 'Chai', done: false
        },
        {
            id: 3, location: '17.02.A', name:'Mì gói hảo hảo tôm 75g',
            sku: 'KF-00789', qty: 20, unit: 'Gói', done: false
        },
        {
            id: 4, location: '22.08.A', name:'Snack Oshi Tôm 68g',
            sku: 'KF-01024', qty: 12, unit: 'Gói', done: false
        },
        {
            id: 5, location: '09.03.C', name:'Dầu ăn Neptune 1L',
            sku: 'KF-01100', qty: 6, unit:'Chai', done: false
        }
    ]
    // Render Items
    export default function productListScreen(){
        //Hàm định nghĩa mỗi item sẽ trông như thế nào , flat list sẽ tự động gọi cho mỗi phần tử trong mảng product
        function renderItem({item}){
            return(
                // dùng mảng để gộp 2 styles lại nếu xong thì áp dụng style mờ , k thì thôi
                <View style = {[styles.itemRow, item.done && styles.itemDone]}> 
                    {/* Vị trí và kệ */}
                    <View style ={styles.locationBox}>
                        <Text style = {styles.locationText}>
                            {item.location}
                        </Text>
                    </View>
                    {/* Tên và SKU */}
                    <View style ={styles.itemInfo}>
                    <Text style ={styles.itemName}>{item.name}</Text>
                        <Text style ={styles.itemSKU}>{item.sku}</Text>
                </View>
                {/* Sô lượng đơn hàng */}
                <View style ={styles.itemQty}>
                    <Text style = {styles.qtyValue}>{item.done ? '✓' : item.qty }</Text>
                    <Text style = {styles.qtyUnit}>{item.unit}</Text>
                </View>
                </View>
            );
        }
        return (
            <SafeAreaView style = {styles.safeArea}>
                {/* Header */}
                <View style = {styles.header}>
                    <TouchableOpacity onPress ={() => router.back()}>
                        <Text style = {styles.backBtn}> ‹ </Text>
                    </TouchableOpacity>
                <Text style = {styles.headerTitle}>
                    #KF-12345 . Q.7
                </Text>
                <View style = {styles.badge}>
                    <Text style = {styles.badgeText}>8 Còn Lại</Text>
                </View>
            </View>
            {/* Phần Thân chip  */}
            <View style ={styles.zoneChip}>
                <Text style = {styles.zoneIcon}>🍬</Text>
                <View style = {styles.zoneInfo}>
                    <Text style = {styles.zoneName}>Khu vực Bánh & Kẹo</Text>
                    <Text style = {styles.zoneSub}>12 sản phẩm thuộc khu vực của bạn</Text>
                </View>
            <View style = {styles.zoneProgress}>
                <Text style = {styles.zoneProgressVal}>4/12</Text>
                <Text style = {styles.zoneProgressSub}>Đã lấy</Text>
            </View>
            </View>
            {/* Danh sách các sản phẩm phần cuối */}
            <FlatList 
            data = {products}
            keyExtractor={(item) => item.id.toString()}
            renderItem = {renderItem}
            contentContainerStyle = {styles.list}/>
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
            padding: 16,
            backgroundColor: '#fff',
            borderBottomWidth: 1,
            borderBottomColor: '#eee',
        },
        backBtn: {
            fontSize: 28,
            color: COLORS.primary,
            marginRight: 10,
        },
        headerTitle: {
            flex: 1,
            fontSize: 16,
            fontWeight: '700',
            color: '#222',
        },
        badge: {
            backgroundColor: '#fff3e0',
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 20,
        },
        badgeText: {
            fontSize: 12,
            fontWeight: '600',
            color: '#e65100',
        },

        // Chip khu vực
        zoneChip: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#fff',
            margin: 12,
            padding: 14,
            borderRadius: 16,
            gap: 12,
        },
        zoneIcon: { fontSize: 28 },
        zoneInfo: { flex: 1 },
        zoneName: {
            fontSize: 14,
            fontWeight: '700',
            color: '#222',
        },
        zoneSub: {
            fontSize: 12,
            color: '#888',
            marginTop: 2,
        },
        zoneProgress: { alignItems: 'center' },
        zoneProgressVal: {
            fontSize: 18,
            fontWeight: '800',
            color: COLORS.primary,
        },
        zoneProgressLbl: {
            fontSize: 11,
            color: '#888',
        },

        // Danh sách
        list: {
            padding: 12,
            gap: 8,
        },

        // Mỗi item
        itemRow: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#fff',
            borderRadius: 14,
            padding: 12,
            gap: 12,
            borderWidth: 1.5,
            borderColor: 'transparent',
        },
        itemDone: {
            opacity: 0.45,
        },
        locationBox: {
            backgroundColor: COLORS.primary,
            borderRadius: 10,
            padding: 8,
            alignItems: 'center',
            minWidth: 52,
        },
        locationText: {
            color: '#fff',
            fontSize: 11,
            fontWeight: '700',
            textAlign: 'center',
        },
        itemInfo: { flex: 1 },
        itemName: {
            fontSize: 13,
            fontWeight: '600',
            color: '#222',
        },
        itemSku: {
            fontSize: 11,
            color: '#888',
            marginTop: 3,
        },
        itemQty: { alignItems: 'center' },
        qtyValue: {
            fontSize: 20,
            fontWeight: '800',
            color: COLORS.primary,
        },
        qtyUnit: {
            fontSize: 11,
            color: '#888',
        },
    });