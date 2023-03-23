import { Alert } from "react-native";

const combineData = (friendAvatar, sortedLastMessage) => {
  return friendAvatar.map((friend) => {
    const lastMessageData = sortedLastMessage.find((chat) =>
      chat.chatters.includes(friend.name)
    );
    return {
      ...friend,
      lastMessage: lastMessageData ? lastMessageData.message : "",
    };
  });
};

function processAuthError(authError) {
  if (authError.message.includes("user-not-found")) {
    Alert.alert(
      "Erreur",
      "L'utilisateur n'existe pas. Veuillez créer un compte."
    );
  } else if (authError.message.includes("wrong-password")) {
    Alert.alert("Erreur", "Mot de passe incorrect. Veuillez réessayer.");
  } else if (authError.message.includes("email-already-in-use")) {
    Alert.alert(
      "erreur",
      "Cet email est déjà utilisé. Veuillez vous connecter."
    );
  } else if (authError.message.includes("network-request-failed")) {
    Alert.alert("erreur", "Veuillez vérifier votre connexion internet.");
  } else if (authError.message.includes("invalid-email")) {
    Alert.alert("erreur", "Veuillez entrer un email valide.");
  } else {
    Alert.alert("erreur", "Une erreur est survenue. Veuillez réessayer");
  }
}

export { combineData, processAuthError };
