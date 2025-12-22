'use client';

import { useParams, useRouter } from 'next/navigation';
import { useRequestQuery } from '@/hooks/query/useRequestsQuery';
import moment from 'moment-timezone';

import Detail from './components/Detail';
import {
  CheckIcon,
  Loader2,
  PencilIcon,
  PlusIcon,
  Trash2,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import AddRequestDetail from './components/request-detail/AddRequestDetail';

import { useUiStore } from '@/stores/uiStore';
import ListRequestDetail from './components/request-detail/ListRequestDetail';
import EditPage from './components/Edit';
import { useRequestsMutations } from '@/hooks/mutation/useRequestsMutation';
import { useState } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useAuthStore } from '@/stores/authStore';

const Page = () => {
  const {
    openAddRequestDetailDrawer,
    setOpenAddRequestDetailDrawer,
    openEditRequestDrawer,
    setOpenEditRequestDrawer,
    openAlertDialogRequest,
    setOpenAlertDialogRequest,
  } = useUiStore();

  const { user } = useAuthStore();

  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);
  const { data, isLoading, error } = useRequestQuery(id);
  const { deleteRequest, updateRequestApproval, updateRequestRejection } =
    useRequestsMutations();

  const [deleteId, setDeleteId] = useState<number>(0);

  const onHandleEditRequestDrawer = () => {
    setOpenEditRequestDrawer(true);
  };

  const handleOnDelete = (id: number) => {
    setOpenAlertDialogRequest(true);
    setDeleteId(id);
  };

  const onDeleteRequest = () => {
    deleteRequest.mutate(deleteId, {
      onSuccess: () => {
        router.push('/request');
      },
    });
  };

  const onHandleApproval = (id: number) => {
    updateRequestApproval.mutate({ id });
  };

  const onHandleRejection = (id: number) => {
    updateRequestRejection.mutate({ id });
  };

  if (!id) return <div>Invalid Request ID</div>;

  const item = data?.item;

  return isLoading ? (
    <div className="flex items-center justify-center h-full text-xl font-medium">
      <Loader2 className="size-14 animate-spin text-neutral-300" />
    </div>
  ) : error ? (
    <div className="text-red-400">Error: {String(error)}</div>
  ) : !item ? (
    <div className="text-neutral-400">No data found</div>
  ) : (
    <div className="p-8  max-w-7xl mx-auto font-sans w-full">
      <div className="flex pb-6 border-b items-center justify-between flex-wrap gap-4">
        <div className="flex flex-col gap-1.5 ">
          <span className="">Project Name</span>
          <h1 className="text-3xl tracking-tight ">{item.project_name}</h1>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => handleOnDelete(item.id)}
          >
            <Trash2 className="size-3" />
            Delete
          </Button>
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => onHandleEditRequestDrawer()}
          >
            <PencilIcon className="size-3" />
            Edit
          </Button>

          {user && (user.role === 'ADMIN' || user.role === 'APPROVER') && (
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={() => onHandleApproval(item.id)}
            >
              <CheckIcon className="size-3" />
              Approve
            </Button>
          )}

          {user && (user.role === 'ADMIN' || user.role === 'APPROVER') && (
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={() => onHandleRejection(item.id)}
            >
              <X className="size-3" />
              Reject
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-6">
        <div className="space-y-4">
          <Detail label="Request Code" value={item.request_code} />
          <Detail
            label="Request Date"
            value={moment(item.request_date)
              .tz('Asia/Jakarta')
              .format('DD MMM YYYY | hh:mm')}
          />

          <Detail label="Department" value={item.department.name} />
          <Detail label="Requested By" value={item.request_by.name} />
        </div>

        <div className="space-y-4">
          <div className="w-fit lg:w-full">
            <Detail label="Priority" value={item.priority}>
              <div
                className={
                  'text-xs  px-3 py-1.5 rounded-sm flex items-center gap-2 w-fit '
                }
              >
                <span
                  className={`text-xs size-2 rounded-full ${
                    item.priority === 'HIGH'
                      ? 'bg-red-700 shadow-red-100'
                      : item.priority === 'MEDIUM'
                      ? 'bg-amber-700 shadow-amber-100'
                      : 'bg-green-700 shadow-green-100'
                  }`}
                ></span>

                {item.priority}
              </div>
            </Detail>
          </div>
          <div className="w-fit lg:w-full">
            <Detail label="Status" value={item.status}>
              <div
                className={
                  'text-xs  px-3 py-1.5 rounded-sm flex items-center gap-2 w-fit '
                }
              >
                <span
                  className={`text-xs size-2 rounded-full ${
                    item.status === 'SUBMITTED'
                      ? 'bg-green-700 shadow-green-100'
                      : item.status === 'APPROVED'
                      ? 'bg-blue-700 shadow-blue-100'
                      : item.status === 'REJECTED'
                      ? 'bg-red-700 shadow-red-100'
                      : 'bg-neutral-800 text-neutral-400 shadow-neutral-700'
                  }`}
                ></span>

                {item.status}
              </div>
            </Detail>
          </div>

          <Detail
            label="Approved By"
            value={item.approved_by ? item.approved_by.name : '-'}
          />
          <Detail
            label="Rejected By"
            value={item.rejected_by ? item.rejected_by.name : '-'}
          />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Detail
          label="Created At"
          value={moment(item.createdAt)
            .tz('Asia/Jakarta')
            .format('DD MMM YYYY | hh:mm')}
        />
        <Detail
          label="Updated At"
          value={moment(item.updatedAt)
            .tz('Asia/Jakarta')
            .format('DD MMM YYYY | hh:mm')}
        />
        <Detail
          label="Approved At"
          value={
            item.approved_at
              ? moment(item.approved_at)
                  .tz('Asia/Jakarta')
                  .format('DD MMM YYYY | hh:mm')
              : '-'
          }
        />
        <Detail
          label="Rejected At"
          value={
            item.rejected_at
              ? moment(item.rejected_at)
                  .tz('Asia/Jakarta')
                  .format('DD MMM YYYY | hh:mm')
              : '-'
          }
        />
      </div>

      <div className="border-b py-6">
        <Detail label="Notes" value={item.notes} />
      </div>

      <div className="flex flex-col py-6 border-b ">
        <div className="flex sm:items-center  justify-between sm:flex-row flex-col gap-4 ">
          <div className="flex flex-col gap-0.5 ">
            <span className="text-2xl tracking-tight ">Request Details</span>
            <span className=" text-sm">
              Add request items and quantities as needed.
            </span>
          </div>

          <Drawer
            open={openEditRequestDrawer}
            onOpenChange={setOpenEditRequestDrawer}
          >
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>
                  <span className="text-3xl pt-2 font-light tracking-tight">
                    Edit Request Form
                  </span>
                </DrawerTitle>
              </DrawerHeader>
              <EditPage id={id} />
            </DrawerContent>
          </Drawer>

          <Drawer
            open={openAddRequestDetailDrawer}
            onOpenChange={setOpenAddRequestDetailDrawer}
          >
            <DrawerTrigger asChild>
              <Button variant="outline" className="cursor-pointer">
                <PlusIcon />
                Add Request Detail
              </Button>
            </DrawerTrigger>

            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>
                  <span className="text-3xl pt-2 font-light tracking-tight">
                    Material Request Detail Form
                  </span>
                </DrawerTitle>
                <DrawerDescription>
                  Add request items and quantities as needed.
                </DrawerDescription>
              </DrawerHeader>
              <AddRequestDetail id={id} />
            </DrawerContent>
          </Drawer>
        </div>

        <AlertDialog
          open={openAlertDialogRequest}
          onOpenChange={setOpenAlertDialogRequest}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you absolutely sure to delete this data?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                data from the servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button
                  variant="destructive"
                  className="bg-red-600 hover:bg-red-700 cursor-pointer focus:ring-red-500"
                  onClick={() => onDeleteRequest()}
                >
                  Yes, Delete It
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {data ? <ListRequestDetail id={id} /> : null}
      </div>
    </div>
  );
};

export default Page;
