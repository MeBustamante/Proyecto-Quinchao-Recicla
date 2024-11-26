import React, { useContext } from 'react';
import { View, Text, StyleSheet, Modal, ScrollView, TouchableOpacity } from 'react-native';
import { AppContext } from '../ConfigGlobal/AppContext';
import { Ionicons } from '@expo/vector-icons';

const Campana = ({ visible, onClose }) => {
  const { notifications } = useContext(AppContext);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Notificaciones</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close-circle-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.notificationsContainer}>
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <Text key={index} style={styles.notificationText}>
                  {notification}
                </Text>
              ))
            ) : (
              <Text style={styles.noNotifications}>No hay notificaciones</Text>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  notificationsContainer: {
    paddingVertical: 10,
  },
  notificationText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  noNotifications: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Campana;
