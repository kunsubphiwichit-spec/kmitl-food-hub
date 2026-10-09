"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Menu, X, Shield, ChevronDown } from "lucide-react";
import { Navbar as HeroUINavbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from "@heroui/react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Mock auth state
  const isLoggedIn = false;
  const isSuperAdmin = false;

  const navItems = [
    { name: "หน้าหลัก", href: "/" },
    { name: "ร้านอาหาร", href: "/stores" },
    { name: "เส้นทาง EV", href: "/transport" },
    { name: "เกี่ยวกับเรา", href: "/about" },
    { name: "ติดต่อเรา", href: "/contact" },
    { name: "แนะนำร้าน", href: "/suggest" },
  ];

  return (
    <HeroUINavbar 
      onMenuOpenChange={setIsMenuOpen} 
      maxWidth="xl" 
      className="bg-white/80 backdrop-blur-md border-b border-gray-100"
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-[#C8490B]",
        ],
      }}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden text-gray-700"
          icon={isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        />
        <NavbarBrand>
          <Link href="/" className="flex flex-col">
            <p className="font-bold text-inherit text-xl flex items-center gap-1">
              KMITL <span className="text-[#C8490B]">HUB</span>
            </p>
            <p className="text-[10px] font-semibold text-gray-500 tracking-wider">FOOD & TRANSPORT</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        {navItems.map((item, index) => (
          <NavbarItem key={`${item.name}-${index}`} isActive={index === 0}>
            <Link color="foreground" href={item.href} className="text-gray-700 hover:text-[#C8490B] font-medium text-sm transition-colors">
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end" className="gap-2 sm:gap-4">
        {isLoggedIn && (
          <NavbarItem className="hidden lg:flex">
            <div className="flex items-center gap-1 px-3 py-1 bg-green-50 border border-green-100 rounded-full text-green-700 text-xs font-medium">
              <Shield size={12} />
              Zero Trust Active
            </div>
          </NavbarItem>
        )}
        
        <NavbarItem className="hidden sm:flex">
          <Button isIconOnly variant="light" aria-label="Search" className="text-gray-600">
            <Search size={20} />
          </Button>
        </NavbarItem>
        
        <NavbarItem>
          {isLoggedIn ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="warning"
                  name="User"
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold text-[#C8490B]">user@kmitl.ac.th</p>
                </DropdownItem>
                {isSuperAdmin && (
                  <DropdownItem key="admin" color="warning" href="/admin" startContent={<Shield size={16} />}>
                    Super Admin Console
                  </DropdownItem>
                )}
                <DropdownItem key="settings">My Settings</DropdownItem>
                <DropdownItem key="logout" color="danger">
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Button as={Link} color="warning" href="/login" variant="flat" className="text-[#C8490B] bg-orange-50 font-medium font-semibold">
              เข้าสู่ระบบ
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="pt-6">
        {navItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link
              className="w-full text-gray-700 hover:text-[#C8490B] text-lg py-2 block border-b border-gray-100"
              href={item.href}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </HeroUINavbar>
  );
}
