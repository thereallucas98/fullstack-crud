import { Icon, Link, LinkProps, Text } from "@chakra-ui/react";
import { NavLink as RRLink } from "react-router-dom";
import { ElementType } from "react";

interface NavLinkProps extends LinkProps {
  icon: ElementType;
  children: string;
  hrefString: string;
}

export function NavLink({ icon, children, hrefString, ...rest }: NavLinkProps) {
  const isActive = true;

  return (
    <Link
      as={RRLink}
      to={hrefString}
      _activeLink={{
        color: "blue.900",
      }}
      display="flex"
      alignItems="center"
      {...rest}
    >
      <Icon as={icon} fontSize="20" />
      <Text ml="4" fontWeight="medium">
        {children}
      </Text>
    </Link>
  );
}
