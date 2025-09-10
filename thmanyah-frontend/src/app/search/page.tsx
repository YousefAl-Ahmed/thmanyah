import SearchScreen from '@/features/search/SearchScreen'; 
export default function SearchPage
({ searchParams, }: { searchParams: { q?: string }; }) 
{ 
return <SearchScreen initialQ={(searchParams.q ?? '').toString()} />;
 }