import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUnreadNotifications,
  markNotificationAsRead,
} from "../redux/actions/notifsActions";
import BoiteBlanche from "../components/Boite_blanche";
import { useTranslation } from "react-i18next";

const PageNotifications = () => {
  const dispatch = useDispatch();
  const { notifications, loading, error } = useSelector(
    (state) => state.notifications
  );
  const userInfo = useSelector((state) => state.user.userInfo); // Utilisateur connecté
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (userInfo?.userId) {
      dispatch(fetchUnreadNotifications());
    }
  }, [dispatch, userInfo]);

  const handleOpenModal = (notification) => {
    setSelectedNotification(notification);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedNotification(null);
  };

  const handleMarkAsRead = async () => {
    if (selectedNotification) {
      await dispatch(markNotificationAsRead(selectedNotification.notificationId));
      handleCloseModal();
      // Re-fetch les notifications non lues
      dispatch(fetchUnreadNotifications());
    }
  };

  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity
      style={styles.notificationRow}
      onPress={() => handleOpenModal(item)}
    >
      <Text style={styles.notificationType}>{item.type}</Text>
    </TouchableOpacity>
  );

  if (!userInfo) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{t("notifications.loginRequired")}</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F25C05" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Erreur : {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>
      {t("notification.title")} <Text style={{ color: "#F25C05" }}>{t("notification.subtitle")}</Text> 
      </Text>

      <BoiteBlanche>
        {notifications && notifications.length > 0 ? (
          <FlatList
            data={notifications}
            keyExtractor={(item) => item.notificationId.toString()}
            renderItem={renderNotificationItem}
          />
        ) : (
          <Text style={styles.message}>
             {t("notification.noNotifications")}
          </Text>
        )}
      </BoiteBlanche>

      {/* Modal pour afficher les détails de la notification */}
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedNotification && (
              <>
                <Text style={styles.modalTitle}>
                  {selectedNotification.type}
                </Text>
                <Text style={styles.modalMessage}>
                  {selectedNotification.message}
                </Text>
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.cancelButton]}
                    onPress={handleCloseModal}
                  >
                    <Text style={styles.cancelButtonText}>{t("notification.modal.cancel")}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.submitButton]}
                    onPress={handleMarkAsRead}
                  >
                    <Text style={styles.submitButtonText}>
                    {t("notification.modal.markAsRead")}
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(166, 116, 55, 0.1)",
    paddingBottom: 50,
  },
  titre: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
    marginVertical: 20,
  },
  notificationRow: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: "#ccc",
  },
  notificationType: {
    fontSize: 16,
    color: "#333",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    backgroundColor: "#ccc",
  },
  submitButton: {
    backgroundColor: "#F25C05",
  },
  cancelButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
  },
  message: {
    fontSize: 18,
    color: "#555",
    textAlign: "center",
    marginTop: 20,
  },
});

export default PageNotifications;
