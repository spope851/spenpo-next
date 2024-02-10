import {
  addDomainToProject,
  removeDomainFromProject,
  updateProjectDomain,
} from '@/app/services/vercel'
import { NextRequest, NextResponse } from 'next/server'

const success = { status: 200, message: 'updated successfully' }

export async function POST(req: NextRequest) {
  const BODY = await req.json()
  const { name, project, newDomain, newRedirect, newRedirectStatus } = BODY

  const update = async (domain: string) => {
    if (newRedirect || newRedirectStatus) {
      // patch project domain
      const req = await updateProjectDomain(
        project,
        domain,
        newRedirect,
        newRedirectStatus
      )

      if (req.ok) return NextResponse.json(success)
      else {
        const res = await req.json()
        return NextResponse.json({ status: 400, ...res })
      }
    } else return NextResponse.json(success)
  }

  if (newDomain !== name) {
    // delete old domain and add new
    let req = await removeDomainFromProject(project, name)

    if (!req.ok) {
      const res = await req.json()
      return NextResponse.json({ status: 400, ...res })
    }

    req = await addDomainToProject(project, newDomain)

    if (!req.ok) {
      const res = await req.json()
      return NextResponse.json({ status: 400, ...res })
    }

    return await update(newDomain)
  } else {
    return await update(name)
  }
}
