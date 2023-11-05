'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from 'convex/react';
import { useUser } from '@clerk/clerk-react';
import { toast } from 'sonner';
import { MoreHorizontal, Trash } from 'lucide-react';

import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface MenuProps {
  documentId: Id<'documents'>;
}

const Menu = ({ documentId }: MenuProps) => {
  const router = useRouter();
  const { user } = useUser();

  const archive = useMutation(api.documents.archive);

  const onArchive = () => {
    const promise = archive({
      id: documentId
    });
    toast.promise(promise, {
      loading: 'Moving to trash...',
      success: 'Note moved to trash!',
      error: 'Failed to archive note.'
    });

    router.push('/documents');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        alignOffset={8}
        forceMount
        className="w-60"
      >
        <DropdownMenuItem onClick={onArchive}>
          <Trash className="h-4 w-4 mr-2" />
          Delete
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="text-xs text-muted-foreground p-2">Last edited by: {user?.fullName}</div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

Menu.Skeleton = function MenuSkeleton() {
  return <Skeleton className="h-10 w-10" />;
};

export default Menu;
