'use client';

import { useRequestsDetailQuery } from '@/hooks/query/useRequestsDetailQuery';
import { GetRequestDetailType } from '@/services/requestDetailApi';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import moment from 'moment';
import { useUiStore } from '@/stores/uiStore';
import { useState } from 'react';

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EditRequestDetail from './EditRequestDetail';

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
import { useRequestDetailMutations } from '@/hooks/mutation/useRequestDetailMutation';

type RequestDetailProps = {
  id: number;
};

const ListRequestDetail = ({ id }: RequestDetailProps) => {
  const {
    openEditRequestDetailDrawer,
    setOpenEditRequestDetailDrawer,
    openAlertDialogRequestDetail,
    setOpenAlertDialogRequestDetail,
  } = useUiStore();

  const [detailId, setDetailId] = useState<number>(0);
  const [deleteId, setDeleteId] = useState<number>(0);

  const { data, isLoading, error, refetch } = useRequestsDetailQuery(
    '',
    0,
    99,
    id
  );

  const { deleteRequestDetail } = useRequestDetailMutations();

  if (!data) return;

  const details = data?.items ?? data;

  const handleOnClick = (itemId: number) => {
    setOpenEditRequestDetailDrawer(true);
    setDetailId(itemId);
  };

  const handleOnDelete = (
    itemId: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    setDeleteId(itemId);
    setOpenAlertDialogRequestDetail(true);
  };

  const onDeleteRequestDetail = () => {
    deleteRequestDetail.mutate(deleteId, {
      onSuccess: () => {
        refetch();
      },
    });
    setOpenAlertDialogRequestDetail(false);
  };

  return (
    <div className="mt-6">
      {data.items.length === 0 && (
        <div className="text-neutral-400">No request details created yet.</div>
      )}
      <div className="grid gap-6">
        {details.map((item: GetRequestDetailType, index: number) => (
          <Card
            key={item.id}
            onClick={() => handleOnClick(item.id)}
            className="border-2 border-neutral-800 cursor-pointer bg-neutral-900 hover:border-neutral-700 hover:bg-neutral-800 transition-all duration-200 overflow-hidden"
          >
            <CardHeader className="text-neutral-300 px-6 pb-4 border-b-2 border-neutral-800">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-normal tracking-widest uppercase text-neutral-100">
                    Material Code
                  </span>
                  <h3 className="text-xl font-light tracking-wide mt-1">
                    {item.material_code}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold tracking-wider uppercase bg-neutral-950 text-neutral-100 p-3">
                    {item.material_type}
                  </span>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="text-neutral-500 cursor-pointer p-5 hover:text-red-400 hover:bg-neutral-800"
                    onClick={(e) => handleOnDelete(item.id, e)}
                  >
                    <Trash2 className="size-6" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="px-6 pt-4 pb-6">
              <div className="flex flex-col md:grid gap-4">
                <dl>
                  <dt className="text-xs font-normal tracking-widest uppercase text-neutral-500 mb-2">
                    Description
                  </dt>
                  <dd className="text-base font-light text-neutral-100 leading-relaxed">
                    {item.material_description}
                  </dd>
                </dl>

                <dl>
                  <dt className="text-xs font-normal tracking-widest uppercase text-neutral-500 mb-2">
                    Brand
                  </dt>
                  <dd className="text-base font-light text-neutral-100">
                    {item.brand || '—'}
                  </dd>
                </dl>

                <dl>
                  <dt className="text-xs font-normal tracking-widest uppercase text-neutral-500 mb-2">
                    Quantity
                  </dt>
                  <dd className="text-2xl font-light text-neutral-100 tabular-nums">
                    {item.quantity}
                    <span className="text-sm text-neutral-400 ml-2">
                      {item.unit}
                    </span>
                  </dd>
                </dl>

                <dl>
                  <dt className="text-xs font-normal tracking-widest uppercase text-neutral-500 mb-2">
                    Unit of Measure
                  </dt>
                  <dd className="text-base font-light text-neutral-100 uppercase tracking-wide">
                    {item.unit}
                  </dd>
                </dl>

                {item.specification && (
                  <dl className="col-span-2 pt-3 border-t border-neutral-800">
                    <dt className="text-xs font-normal tracking-widest uppercase text-neutral-500 mb-2">
                      Technical Specification
                    </dt>
                    <dd className="text-sm font-light text-neutral-100 leading-relaxed">
                      {item.specification}
                    </dd>
                  </dl>
                )}

                {item.notes && (
                  <dl className="col-span-2 pt-3 border-t border-neutral-800">
                    <dt className="text-xs font-normal tracking-widest uppercase text-neutral-500 mb-2">
                      Additional Notes
                    </dt>
                    <dd className="text-sm font-light text-neutral-300 leading-relaxed">
                      {item.notes}
                    </dd>
                  </dl>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between">
                <p className="text-xs text-neutral-400 tracking-wide uppercase">
                  Created:{' '}
                  {moment(item.createdAt)
                    .tz('Asia/Jakarta')
                    .format('DD MMM YYYY | hh:mm')}
                </p>

                <span className="text-xs text-neutral-600 tracking-wider">
                  ITEM #{String(index + 1).padStart(3, '0')}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <AlertDialog
        open={openAlertDialogRequestDetail}
        onOpenChange={setOpenAlertDialogRequestDetail}
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
                className="bg-red-600 hover:bg-red-700 text-white cursor-pointer focus:ring-red-500"
                onClick={() => onDeleteRequestDetail()}
              >
                Yes, Delete It
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Drawer
        open={openEditRequestDetailDrawer}
        onOpenChange={setOpenEditRequestDetailDrawer}
      >
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>
              <span className="text-3xl pt-2 font-light tracking-tight text-neutral-100">
                Material Request Detail Form
              </span>
            </DrawerTitle>
            <DrawerDescription>
              Add request items and quantities as needed.
            </DrawerDescription>
          </DrawerHeader>
          <EditRequestDetail id={detailId} />
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default ListRequestDetail;
