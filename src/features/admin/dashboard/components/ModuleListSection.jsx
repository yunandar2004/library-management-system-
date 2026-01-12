"use client";
import ModuleButton from "./ModuleButton";
import { Book, Coins, IdCard, Monitor, Recycle, Users } from "lucide-react";

const ModuleListSection = () => {
  const modules = [
    {
      // title: "Overdue Borrowers",
      title: "Manage Admin",
      lists: [
        {
          name: "Total Admin Base ",
          // icon: <Coins className=" size-7" />,
          icon: <Users className=" size-7" />,

          url: "/admin/admin-management",
        },
      ],
    },
    {
      title: "Manage Users",
      lists: [
        {
          name: "Total User Base",
          icon: <Users className=" size-7" />,
          url: "/admin/user",
        },
        {
          name: "Manage Borrower ",
          // icon: <MessagesSquare className=" size-7" />,
          icon: <Monitor className=" size-7" />,

          url: "/admin/user/borrowers",
        },
        {
          name: "Total Overdue Borrowers",
          icon: <IdCard className=" size-7" />,
          url: "/admin/borrows/overdue-report",
        },
      ],
    },
    {
      title: "Library Book Statistics ",
      lists: [
        {
          name: "Manage Books",
          icon: <Book className=" size-7" />,
          url: "/admin/books",
        },
        // {
        //   name: "Manage Borrower ",
        //   // icon: <MessagesSquare className=" size-7" />,
        //   icon: <Monitor className=" size-7" />,

        //   url: "/admin/user/borrowers",
        // },
        {
          name: "Manage Borrowed/Returned Books",
          icon: <Recycle className=" size-7" />,
          url: "/admin/borrows/borrowedBook",
        },
      ],
    },
    // {
    //   title: "Workforce Management",
    //   lists: [
    //     {
    //       name: "Manage Users",
    //       icon: <Users className=" size-7" />,
    //       url: "/dashboard/user",
    //     },
    //     {
    //       name: "Manage Employees",
    //       icon: <UserRoundCog className=" size-7" />,
    //       url: "/dashboard/employee",
    //     },
    //   ],
    // },
    // {
    //   title: "Account Modules",
    //   lists: [
    //     {
    //       name: "Your Profile",
    //       icon: <UserPen className=" size-7" />,
    //       url: "/dashboard/user-profile",
    //     },
    //     {
    //       name: "Change Password",
    //       icon: <Lock className=" size-7" />,
    //       url: "/dashboard/user-profile/change-password",
    //     },
    //     {
    //       name: "Change Name",
    //       icon: <Type className=" size-7" />,
    //       url: "/dashboard/user-profile/change-name",
    //     },
    //   ],
    // },
  ];
  return (
    <section className=" flex flex-col gap-5 px-5 py-10">
      {modules.map((module) => (
        <div key={module.title} className="mb-3">
          <h1 className="mb-3 text-xl font-bold">{module.title}</h1>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
            {module.lists.map(({ name, icon, url, count }, i) => (
              <div key={i} className="col-span-1 row-span-1 ">
                <ModuleButton name={name} icon={icon} url={url} count={count} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default ModuleListSection;
