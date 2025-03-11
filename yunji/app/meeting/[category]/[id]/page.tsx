'use client';

import FloatingButtonGroup from '@/components/common/FloatingButtonGroup';
import ReviewAvgCard from '@/components/common/review/ReviewAvgCard';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';

import BackButton from '../../_features/BackButton';
import CardWrapper from '../../_features/CardWrapper';
import ContentLabel from '../../_features/ContextLabel';
import MeetingInfo from '../../_features/MeetingInfo';
import ReviewInput from '../../_features/ReviewInput';
import ReviewList from '../../_features/ReviewList';
import UserInfo from '../../_features/UserInfo';

export default function page({ params }: { params: { id: string } }) {
  const meetingId = parseInt(params.id);

  const [isPending, startTransition] = useTransition();
  const [currentMeetingId, setCurrentMeetingId] = useState(meetingId);

  useEffect(() => {
    console.log('[useEffect] meetingId: ', meetingId);
    startTransition(() => {
      setCurrentMeetingId(meetingId);
    });
  }, [meetingId]);

  console.log('meetingId: ', meetingId, 'isPending: ', isPending);
  const router = useRouter();
  return (
    <div className="flex flex-col gap-[48px]">
      <FloatingButtonGroup />
      <BackButton />

      <Button
        onClick={() => router.replace(`/meeting/study/${currentMeetingId + 1}`)}
        className="text-white"
      >
        이동
      </Button>
      <div className="flex flex-col gap-[48px] p-[16px] md:px-[48px]">
        {!isPending && (
          <>
            <CardWrapper meetingId={currentMeetingId} />
            <UserInfo meetingId={currentMeetingId} />
            <MeetingInfo meetingId={currentMeetingId} />
            <ContentLabel>리뷰</ContentLabel>
            <ReviewAvgCard meetingId={currentMeetingId} />
            <ReviewInput meetingId={currentMeetingId} />
            <ReviewList meetingId={currentMeetingId} />
          </>
        )}
      </div>
    </div>
  );
}
