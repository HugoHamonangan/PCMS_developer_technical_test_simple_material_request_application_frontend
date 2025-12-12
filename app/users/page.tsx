// 'use client';

// import { Pencil, Trash2 } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import UserAddDialog from '@/components/UserAddDialog';
// import UserEditDialog from '@/components/UserEditDialog';
// import UserDetailDialog from '@/components/UserDetailDialog';
// import {
//   AlertDialog,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogAction,
// } from '@/components/ui/alert-dialog';
// import { Input } from '@/components/ui/input';
// import { User, useUserStore } from '@/stores/userStore';
// import { useCallback, useEffect, useState } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from '@/components/ui/pagination';
// import { useUserMutations } from '@/hooks/useLoginMutation';
// import { useUsersQuery } from '@/hooks/useUsersQuery';
// import debounce from 'lodash.debounce';
// import { SidebarTrigger } from '@/components/ui/sidebar';
// import LogoutButton from '@/components/LogoutButton';

// export default function UserList() {
//   const {
//     selected,
//     openAdd,
//     openEdit,
//     openDetail,
//     openDelete,
//     isDeleting,
//     setOpenAdd,
//     setOpenDelete,
//     setDeleteId,
//     openEditDialog,
//     openDetailDialog,
//     setOpenDetail,
//     setOpenEdit,
//     setSelected,
//   } = useUserStore();

//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const initialSearch = searchParams.get('search') || '';
//   const initialPage = parseInt(searchParams.get('page') || '1', 10);
//   const limit: number = 10;

//   const [searchValue, setSearchValue] = useState(initialSearch);
//   const [query, setQuery] = useState(initialSearch);
//   const [page, setPage] = useState(initialPage);
//   const [totalPages, setTotalPages] = useState(1);

//   const handleSearch = useCallback(
//     debounce((value: string) => {
//       setQuery(value);
//       setPage(1);
//     }, 300),
//     []
//   );

//   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setSearchValue(value);
//     handleSearch(value);
//   };

//   const { data, isLoading, error } = useUsersQuery(query, page, limit);
//   const { deleteUser } = useUserMutations();

//   const onDeleteUser = () => {
//     deleteUser.mutate(selected!.id);
//   };

//   console.log(data);

//   useEffect(() => {
//     if (data?.totalPages) {
//       setTotalPages(data.totalPages);
//     }
//   }, [data]);

//   const handlePageChange = (newPage: number) => {
//     if (newPage < 1 || newPage > totalPages) return;

//     const params = new URLSearchParams(searchParams.toString());
//     params.set('page', newPage.toString());
//     params.set('search', query);

//     router.push(`?${params.toString()}`);

//     setPage(newPage);
//   };

//   const getPageNumbers = () => {
//     const pages: (number | 'ellipsis')[] = [];
//     if (totalPages <= 5) {
//       for (let i = 1; i <= totalPages; i++) pages.push(i);
//     } else {
//       if (page <= 3) {
//         pages.push(1, 2, 3, 4, 'ellipsis', totalPages);
//       } else if (page >= totalPages - 2) {
//         pages.push(
//           1,
//           'ellipsis',
//           totalPages - 3,
//           totalPages - 2,
//           totalPages - 1,
//           totalPages
//         );
//       } else {
//         pages.push(
//           1,
//           'ellipsis',
//           page - 1,
//           page,
//           page + 1,
//           'ellipsis',
//           totalPages
//         );
//       }
//     }
//     return pages;
//   };

//   return (
//     <>
//       <div className="h-screen w-full py-4 px-6">
//         <div className=" mx-auto flex flex-col w-full h-full min-h-0 ">
//           {/* Header Section */}
//           <div className="bg-white dark:bg-gray-800  h-full dark:border-gray-700 overflow-hidden flex flex-col">
//             <div className="py-6 border-b border-gray-200 dark:border-gray-700">
//               <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
//                 {/* Left side: Icon + Title */}
//                 <div className="flex items-center gap-3">
//                   <div>
//                     <h1 className="text-lg font-semibold text-gray-900 dark:text-white leading-tight">
//                       Registered Users
//                     </h1>
//                     <p className="text-xs text-gray-500 dark:text-gray-400">
//                       Manage and view all users
//                     </p>
//                   </div>
//                 </div>

//                 {/* Right side: Search + Button */}
//                 <div className="flex items-center gap-2.5 shrink-0">
//                   <LogoutButton />
//                   <span className="text-sm">
//                     Total User: {data ? data.total : 0}
//                   </span>
//                   <div className="relative">
//                     <svg
//                       className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                       />
//                     </svg>
//                     <Input
//                       value={searchValue}
//                       onChange={onChange}
//                       placeholder="Search users..."
//                       className="h-8 pl-8 pr-3 w-48 md:w-56 text-sm"
//                     />
//                   </div>

//                   <Button
//                     onClick={() => setOpenAdd(true)}
//                     className="h-8 px-3 text-sm whitespace-nowrap"
//                   >
//                     <svg
//                       className="w-4 h-4"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M12 4v16m8-8H4"
//                       />
//                     </svg>
//                     Add User
//                   </Button>
//                 </div>
//               </div>
//             </div>

//             <div className="p-0 w-full h-full overflow-y-scroll ">
//               {/* Loading State */}
//               {isLoading && (
//                 <div className="text-center py-12">
//                   <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
//                     Loading users...
//                   </p>
//                 </div>
//               )}

//               {/* Error State */}
//               {error && (
//                 <div className="text-center py-12">
//                   <p className="text-red-500 text-sm font-medium">
//                     Failed to load users
//                   </p>
//                 </div>
//               )}

//               {/* Empty State */}
//               {!isLoading &&
//                 !error &&
//                 (!data || !data.users || data.users.length === 0) && (
//                   <div className="text-center py-12">
//                     <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 mb-3">
//                       <svg
//                         className="w-6 h-6 text-gray-400"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
//                         />
//                       </svg>
//                     </div>
//                     <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
//                       No users found
//                     </p>
//                     <p className="text-gray-400 dark:text-gray-500 text-xs mt-0.5">
//                       Try adjusting your search or add a new user
//                     </p>
//                   </div>
//                 )}

//               {/* User List */}
//               {!isLoading && !error && data?.users && data.users.length > 0 && (
//                 <div className="h-full min-h-0">
//                   {/* Table Header - Hidden on mobile */}
//                   <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-2 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider sticky top-0">
//                     <div className="col-span-5">Name</div>
//                     <div className="col-span-5">Email</div>
//                     <div className="col-span-2 text-right">Actions</div>
//                   </div>

//                   {/* Table Body */}
//                   <div className="divide-y divide-gray-200 dark:divide-gray-700">
//                     {data.users.map((u: User) => (
//                       <div
//                         key={u.id}
//                         onClick={() => openDetailDialog(u)}
//                         className="group grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 px-6 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors duration-150 cursor-pointer"
//                       >
//                         {/* Avatar & Name Column */}
//                         <div className="col-span-1 md:col-span-5 flex items-center gap-3 min-w-0">
//                           <div className="shrink-0 w-9 h-9 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-sm">
//                             <span className="text-white font-semibold text-sm">
//                               {u.name.charAt(0).toUpperCase()}
//                             </span>
//                           </div>
//                           <div className="flex-1 min-w-0">
//                             <div className="font-medium text-gray-900 dark:text-white text-sm truncate">
//                               {u.name}
//                             </div>
//                             {/* Email shown on mobile only */}
//                             <div className="md:hidden text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
//                               {u.email}
//                             </div>
//                           </div>
//                         </div>

//                         {/* Email Column - Desktop only */}
//                         <div className="hidden md:flex md:col-span-5 items-center min-w-0">
//                           <span className="text-sm text-gray-600 dark:text-gray-300 truncate">
//                             {u.email}
//                           </span>
//                         </div>

//                         {/* Actions Column */}
//                         <div className="col-span-1 md:col-span-2 flex items-center justify-end gap-1">
//                           <Button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               openEditDialog(u);
//                             }}
//                             disabled={isDeleting}
//                             variant="ghost"
//                             size="icon"
//                             className="h-8 w-8 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
//                           >
//                             <Pencil className="w-3.5 h-3.5" />
//                           </Button>

//                           <Button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               setDeleteId(u.id);
//                               setOpenDelete(true);
//                               setSelected(u);
//                             }}
//                             disabled={isDeleting}
//                             variant="ghost"
//                             size="icon"
//                             className="h-8 w-8 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors"
//                           >
//                             <Trash2 className="w-3.5 h-3.5" />
//                           </Button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* ShadCN Pagination */}
//           <div className="mt-4 flex justify-center">
//             <Pagination>
//               <PaginationContent>
//                 <PaginationItem>
//                   <PaginationPrevious
//                     onClick={() => handlePageChange(page - 1)}
//                   />
//                 </PaginationItem>

//                 {getPageNumbers().map((p, idx) =>
//                   p === 'ellipsis' ? (
//                     <PaginationItem key={`ellipsis-${idx}`}>
//                       <PaginationEllipsis />
//                     </PaginationItem>
//                   ) : (
//                     <PaginationItem key={p}>
//                       <PaginationLink
//                         isActive={p === page}
//                         onClick={() => handlePageChange(p as number)}
//                       >
//                         {p}
//                       </PaginationLink>
//                     </PaginationItem>
//                   )
//                 )}

//                 <PaginationItem>
//                   <PaginationNext onClick={() => handlePageChange(page + 1)} />
//                 </PaginationItem>
//               </PaginationContent>
//             </Pagination>
//           </div>
//         </div>
//       </div>

//       <UserAddDialog open={openAdd} onOpenChange={setOpenAdd} />
//       <UserEditDialog
//         open={openEdit}
//         onOpenChange={setOpenEdit}
//         data={selected}
//       />
//       <UserDetailDialog
//         open={openDetail}
//         onOpenChange={setOpenDetail}
//         data={selected}
//       />

//       <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Delete User</AlertDialogTitle>
//             <AlertDialogDescription>
//               Are you sure you want to delete{' '}
//               <b className="font-bold">{selected?.name}</b>? This action cannot
//               be undone.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
//             <AlertDialogAction onClick={onDeleteUser} disabled={isDeleting}>
//               {isDeleting ? 'Deleting...' : 'Delete'}
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </>
//   );
// }

import React from 'react';

const page = () => {
  return <div>page</div>;
};

export default page;
