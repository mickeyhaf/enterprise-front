'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchTeamMembers } from '@/lib/api';
import { TeamCard } from './TeamCard';

export function TeamList() {
  const { data: teamMembers, isLoading, isError } = useQuery({
    queryKey: ['teamMembers'],
    queryFn: fetchTeamMembers,
  });

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 h-[400px] animate-pulse">
            <div className="w-32 h-32 bg-slate-200 dark:bg-slate-800 rounded-full mx-auto mb-6"></div>
            <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2 mx-auto mb-6"></div>
            <div className="h-20 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12 text-red-500">
        Failed to load team members. Please try again later.
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {teamMembers?.map((member) => (
        <TeamCard
          key={member.id}
          name={member.name}
          role={member.role}
          description={member.description}
          image={member.image}
        />
      ))}
    </div>
  );
}
