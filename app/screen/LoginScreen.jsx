import { useState } from 'react'; // lay cong cu use state cua thu vien react de tao bien cap nhat UI
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';

import { COLORS } from '../../constants/colors';
export default function LoginScreen() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [zone, setZone]         = useState('');

  const zones = ['Khu A', 'Khu B', 'Khu C', 'Khu D'];

  function handleLogin() {
    if (!username || !password || !zone) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin');
      return;
    }
    Alert.alert('Thành công', `Xin chào ${username}!`);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        <View style={styles.logoBox}>
          <Text style={styles.logoIcon}>📦</Text>
        </View>
        <Text style={styles.title}>Kingfood WMS</Text>
        <Text style={styles.subtitle}>Warehouse Management System</Text>

        <View style={styles.form}>

          <TextInput
            style={styles.input}
            placeholder="Tên đăng nhập"
            placeholderTextColor="rgba(255,255,255,0.45)"
            value={username}
            onChangeText={setUsername}
          />

          <TextInput
            style={styles.input}
            placeholder="Mật khẩu"
            placeholderTextColor="rgba(255,255,255,0.45)"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />

          <Text style={styles.zoneLabel}>Chọn khu vực:</Text>
          <View style={styles.zoneRow}>
            {zones.map((z) => (
              <TouchableOpacity
                key={z}
                style={[styles.zoneBtn, zone === z && styles.zoneBtnActive]}
                onPress={() => setZone(z)}
              >
                <Text style={[styles.zoneBtnText, zone === z && styles.zoneBtnTextActive]}>
                  {z}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
            <Text style={styles.loginBtnText}>Đăng nhập</Text>
          </TouchableOpacity>

        </View>

        <Text style={styles.footer}>Kingfood WMS v2.1 © 2025</Text>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logoBox: {
    width: 80, height: 80,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  logoIcon: { fontSize: 40 },
  title: {
    color: COLORS.white,
    fontSize: 26,
    fontWeight: '900',
    marginBottom: 4,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 13,
    marginBottom: 32,
  },
  form: { width: '100%', gap: 14 },
  input: {
    width: '100%',
    padding: 15,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.2)',
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: COLORS.white,
    fontSize: 15,
  },
  zoneLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 13,
    fontWeight: '600',
  },
  zoneRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  zoneBtn: {
    flex: 1,
    padding: 10,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
  },
  zoneBtnActive: {
    backgroundColor: 'rgba(76,175,80,0.3)',
    borderColor: COLORS.accent,
  },
  zoneBtnText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    fontWeight: '600',
  },
  zoneBtnTextActive: { color: COLORS.white },
  loginBtn: {
    backgroundColor: COLORS.accent,
    borderRadius: 14,
    padding: 17,
    alignItems: 'center',
    marginTop: 6,
  },
  loginBtnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '800',
  },
  footer: {
    color: 'rgba(255,255,255,0.35)',
    fontSize: 12,
    marginTop: 32,
  },
});