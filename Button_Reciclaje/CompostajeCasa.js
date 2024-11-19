import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MenuInferior from '../Menu_Inferior/MenuInferior';

const CompostajeCasa = ({ navigation }) => {
    return (
        <ScrollView style={{ flex: 1 }}>
            <LinearGradient colors={['#e6e2d6', '#e6e2d6']} style={styles.gradientBackground}>
                <View style={styles.container}>
                    <Text style={styles.infoTitle}>Compostaje en Casa en la Comuna de Quinchao</Text>
                    <Image source={require('../assets/Compostaje.png')} style={styles.image} />
                    <View style={styles.contentContainer}>
                        <Text style={styles.infoSubtitle}>
                            Aprende cómo hacer compostaje en tu hogar y contribuye al medio ambiente.
                        </Text>
                        <Text style={styles.sectionTitle}>Tips de Compostaje:</Text>
                        <Text style={styles.tip}>
                            • Ubica el compost en un área semi-sombreada.
                        </Text>
                        <Text style={styles.tip}>
                            • Equilibra materiales verdes (húmedos) y marrones (secos).
                        </Text>
                        <Text style={styles.tip}>
                            • Mantén el compost húmedo, pero no encharcado.
                        </Text>
                        <Text style={styles.tip}>
                            • Revuelve el compost regularmente para airearlo.
                        </Text>
                        <Text style={styles.tip}>
                            • Usa restos de comida (sin carne o lácteos) y desechos de jardín.
                        </Text>
                        <Text style={styles.tip}>
                            • Cubre los restos de comida con hojas secas para evitar olores.
                        </Text>
                    </View>

                    <View style={styles.contentContainer}>
                        <Text style={styles.sectionTitle}>Recomendaciones de Cuidado:</Text>
                        <Text style={styles.tip}>
                            • Asegúrate de que el compost tenga buen drenaje para evitar exceso de agua.
                        </Text>
                        <Text style={styles.tip}>
                            • Evita agregar grandes cantidades de cítricos, ya que pueden acidificar el compost.
                        </Text>
                        <Text style={styles.tip}>
                            • Si notas malos olores, revisa el equilibrio entre materiales secos y húmedos.
                        </Text>
                        <Text style={styles.tip}>
                            • Protege el compost de lluvias intensas con una cubierta.
                        </Text>
                        <Text style={styles.tip}>
                            • Después de 2-3 meses, revisa si el compost está listo (color oscuro y olor a tierra fresca).
                        </Text>
                        <Text style={styles.tip}>
                            • Usa el compost en maceteros, huertos urbanos o jardines comunitarios.
                        </Text>
                    </View>

                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Text style={styles.backButtonText}>Volver</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
            <MenuInferior />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { alignItems: 'center', padding: 20 },
    gradientBackground: { flex: 1 },
    contentContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#4CAF50',
        padding: 20,
        marginVertical: 15,
        width: '90%',
    },
    infoTitle: { fontSize: 22, fontWeight: 'bold', color: 'black', textAlign: 'center', marginBottom: 15 },
    infoSubtitle: { fontSize: 16, color: 'black', textAlign: 'center', marginBottom: 15 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#388E3C', textAlign: 'center', marginBottom: 10 },
    tip: { fontSize: 14, color: 'black', textAlign: 'left', marginBottom: 15 },
    image: {
        width: '90%',
        height: 180,
        borderRadius: 10,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#388E3C', // Marco vegetal
    },
    backButton: { backgroundColor: '#4CAF50', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10, marginTop: 20 },
    backButtonText: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
});

export default CompostajeCasa;
