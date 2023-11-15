import Link from 'next/link';
import './globals.css';
import { Control } from './Control';
export const metadata = {
  title: 'Web tutorials',
  description: 'Generated by SoonHwan Kwon',
}

export default async function RootLayout({ children }) {
  // resp 뒤에 붙은 {next: { revalidate: 0 } } 은 캐시를 0초동안 유지하는 명령어, {cache:'no-store'}를 사용해도 됨
  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}topics/`, {next: { revalidate: 0 } }); 
  const topics = await resp.json();
  return (
    <html>
      <body>
        <h1><Link href='/'>WEB</Link></h1>
        <ol>
          {topics.map((topic)=>{
            return <li key={topic.id}><Link href={`/read/${topic.id}`}>{topic.title}</Link></li>
          })}
        </ol>
          {children}
          <Control />
      </body>
    </html>
  )
}
