import React from "react"

const tech = [
  { label: "React", url: "https://react.dev", icon: "/icons/react.png" },
  { label: "TypeScript", url: "https://typescriptlang.org", icon: "/icons/typescript.png" },
  { label: "Tailwind CSS", url: "https://tailwindcss.com", icon: "/icons/tailwind.png" },
  { label: "shadcn/ui", url: "https://ui.shadcn.com", icon: "/icons/shadcn.png" },
  { label: "React Router", url: "https://reactrouter.com", icon: "/icons/reactrouter.png" },
  { label: "Vite", url: "https://vitejs.dev", icon: "/icons/vite.png" },
]

const team = [
  {
    name: "Ruben Ramirez",
    role: "FullStack",
    avatar: "/team/person1.png",
    links: [
      { label: "GitHub", url: "https://github.com/RubenRamirez12", icon: "/icons/github.png" },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/ruben-ramirez12/",
        icon: "/icons/linkedin.png",
      },
      {
        label: "person1@email.com",
        url: "mailto:rubenramirez121212@gmail.com",
        icon: "/icons/email.png",
      },
    ],
  },
  {
    name: "Chaquon Cloud",
    role: "FullStack",
    avatar: "/team/person2.png",
    links: [
      { label: "GitHub", url: "https://github.com", icon: "/icons/github.png" },
      { label: "LinkedIn", url: "https://linkedin.com", icon: "/icons/linkedin.png" },
      { label: "person2@email.com", url: "mailto:person2@email.com", icon: "/icons/email.png" },
    ],
  },
  {
    name: "Dade Willms",
    role: "FullStack",
    avatar: "/team/person3.png",
    links: [
      { label: "GitHub", url: "https://github.com", icon: "/icons/github.png" },
      { label: "LinkedIn", url: "https://linkedin.com", icon: "/icons/linkedin.png" },
      { label: "person3@email.com", url: "mailto:person3@email.com", icon: "/icons/email.png" },
    ],
  },
  {
    name: "Tou Thao",
    role: "FullStack",
    avatar: "/team/person4.png",
    links: [
      { label: "GitHub", url: "https://github.com", icon: "/icons/github.png" },
      { label: "LinkedIn", url: "https://linkedin.com", icon: "/icons/linkedin.png" },
      { label: "person4@email.com", url: "mailto:person4@email.com", icon: "/icons/email.png" },
    ],
  },
]

interface LinkItem {
  label: string
  url: string
  icon: string
}

interface TeamMember {
  name: string
  role: string
  avatar: string
  links: LinkItem[]
}

function FooterLink({ label, url, icon }: LinkItem) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-2 transition-colors"
    >
      <img
        src={icon}
        alt={label}
        className="h-3.5 w-3.5 shrink-0 object-contain opacity-50 transition-opacity group-hover:opacity-100"
      />
      <span className="text-xs text-zinc-500 transition-colors group-hover:text-zinc-200">
        {label}
      </span>
    </a>
  )
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-xs font-semibold tracking-widest text-zinc-400 uppercase">{title}</span>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 px-10 py-8">
      <div
        className="grid gap-10"
        style={{ gridTemplateColumns: `repeat(${1 + team.length}, minmax(0, 1fr))` }}
      >
        <FooterColumn title="Built With">
          {tech.map((t) => (
            <FooterLink key={t.label} label={t.label} url={t.url} icon={t.icon} />
          ))}
        </FooterColumn>

        {team.map((person: TeamMember) => (
          <FooterColumn key={person.name} title={person.name}>
            <div className="-mt-1 mb-1 flex items-center gap-2">
              <img
                src={person.avatar}
                alt={person.name}
                className="h-5 w-5 rounded-full object-cover opacity-80"
              />
              <span className="text-xs text-zinc-600">{person.role}</span>
            </div>
            {person.links.map((l) => (
              <FooterLink key={l.label} label={l.label} url={l.url} icon={l.icon} />
            ))}
          </FooterColumn>
        ))}
      </div>

      <p className="mt-8 text-center text-xs text-zinc-700">
        © {new Date().getFullYear()} — All rights reserved
      </p>
    </footer>
  )
}
