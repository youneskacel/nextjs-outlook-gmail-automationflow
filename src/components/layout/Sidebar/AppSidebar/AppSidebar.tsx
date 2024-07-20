// React
import React, { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

// ChakraUI
import { Text, Divider, Flex, Stack } from "@chakra-ui/react";

// Supabase
import { Database } from "@/lib/database.types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

// Component
import { UserCard } from "./Card/UserCard";
import { NavGroup } from "./Button/NavButton/NavGroup";
import { NavItem } from "./Button/NavButton/NavItem";

// Logo
import ProximaLogo from "@public/proxima/logo/proxima_logo_light.svg";

// Menu
import { navData } from "./AppSidebar.constant";

// Current User
import { GetCurrentUser } from "@/hooks/user/getCurrentUser";

// Interface
interface NavItemData {
  label: string;
  icon: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  path: string;
}

interface User {
  account_id: string;
  first_name: string;
  last_name: string;
  role: string;
  email: string;
  profile_image: string;
}

interface Props {}

const AppSidebar: FC<Props> = (props) => {
  const supabaseClient = useSupabaseClient<Database>();
  const router = useRouter();

  const [setting, setSetting] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const { data: currentUser, error, isLoading } = GetCurrentUser();

  const handleLogout = async () => {
    await supabaseClient.auth.signOut().then(() => {
      router.push("/");
    });
  };

  useEffect(() => {
    if (!isLoading && currentUser) {
      setUser(currentUser);
    }
  }, [currentUser, isLoading]);

  const generateNavGroup = (
    groupLabel: string | null,
    subItems: NavItemData[],
    key : number
  ) => (
    <NavGroup label={groupLabel} key={key}>
      {subItems.map((item, index) => (
        <NavItem
          key={index}
          path={item.path.replace("${accountId}", user?.account_id ?? "")}
          icon={item.icon}
          label={item.label}
          active={
            router.pathname.replace("${accountId}", user?.account_id ?? "") ===
            item.path.replace("${accountId}", user?.account_id ?? "")
          }
        />
      ))}
    </NavGroup>
  );

  return (
    <Flex as="section" minH="100vh" bg={"proxima.black"}>
      <Flex
        flex="1"
        maxW={{ base: "full", sm: "xs" }}
        p={"4"}
        color={"proxima.white"}
        fontSize="sm"
      >
        <Stack justify="space-between">
          <Stack spacing={4} shouldWrapChildren>
            <Image src={ProximaLogo} alt="Proxima Logo" />
            <Divider />
            <Stack overflow="auto" pt={2} spacing={8}>
              {navData.map((data, index) =>
                generateNavGroup(data.groupLabel, data.subItems,index)
              )}
            </Stack>
          </Stack>
          <Stack spacing={4}>
            <Stack spacing="1">
              <Text cursor={"pointer"} onClick={handleLogout}>
                SignOut
              </Text>
            </Stack>
            <Divider />
            <Stack cursor={"pointer"} onClick={() => setSetting(!setting)}>
              {user && (
                <UserCard
                  name={user.first_name ?? ""}
                  image={user.profile_image ?? ""}
                  email={user.email ?? ""}
                />
              )}
            </Stack>
          </Stack>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default AppSidebar;
