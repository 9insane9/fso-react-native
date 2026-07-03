import React, { useState } from "react";
import { View, Pressable, useWindowDimensions } from "react-native";
import { Menu, Icon } from "react-native-paper";
import Text from "../common/Text";
import theme from "../../theme";

function SortMenuBase({ sortKey, setSortKey, options }) {
  //   console.log("SortMenu render");
  const [visible, setVisible] = useState(false);
  const { width } = useWindowDimensions();

  const open = () => setVisible(true);
  const close = () => setVisible(false);

  const select = (key) => {
    setSortKey(key);
    close();
  };

  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={close}
        contentStyle={{ width }}
        anchorPosition="bottom"
        anchor={
          <Pressable
            onPress={open}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 25,
              width,
            }}
          >
            <Text
              fontSize="heading"
              fontWeight="bold"
            >
              {options[sortKey].label}
            </Text>
            <Icon
              source="triangle-down"
              size={15}
              color={theme.colors.textSecondary}
            />
          </Pressable>
        }
      >
        <Menu.Item
          title="Latest repositories"
          onPress={() => select("latest")}
        />
        <Menu.Item
          title="Highest rated repositories"
          onPress={() => select("highestRated")}
        />
        <Menu.Item
          title="Lowest rated repositories"
          onPress={() => select("lowestRated")}
        />
      </Menu>
    </View>
  );
}

const SortMenu = React.memo(SortMenuBase);
SortMenu.displayName = "SortMenu";

export default SortMenu;
