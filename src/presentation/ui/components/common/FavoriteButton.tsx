import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/MaterialIcons";

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: (newState: boolean) => void;
  size?: number;
  color?: string;
}

/**
 * A favorite button component. Toggles between favorite and not favorite states.
 */
const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isFavorite,
  onToggle,
  size = 30,
  color = "red",
}) => {
  const handlePress = () => {
    onToggle(!isFavorite);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <HeartIcon
        name={isFavorite ? "favorite" : "favorite-border"}
        size={size}
        color={isFavorite ? color : "gray"}
      />
    </TouchableOpacity>
  );
};

const HeartIcon = styled(Icon)`
  transition: color 0.2s ease-in-out;
`;

export default FavoriteButton;
