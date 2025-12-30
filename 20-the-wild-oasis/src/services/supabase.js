import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default supabase;

// export default function SupabaseService() {
//   const [instruments, setInstruments] = useState([]);

//   useEffect(() => {
//   async function getInstruments() {
//     const { data } = await supabase.from("instruments").select();
//     setInstruments(data);
//   }
//   getInstruments();
//   }, []);
//   return (
//     <ul>
//       {instruments.map((instrument) => (
//         <li key={instrument.name}>{instrument.name}</li>
//       ))}
//     </ul>
//   );
// }
