import { useState } from "react";
import { Section, Row } from "../components/ui/layout";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/input";
import { Checkbox } from "../components/ui/input";
import { Radio } from "../components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardBadge } from "../components/ui/card";
import { PlusIcon, MailIcon, SearchIcon, ArrowIcon, ChartIcon, UserIcon, CartIcon } from "../components/ui/icons";
const TABS = ["Buttons", "Inputs", "Cards"];

export default function Showcase() {
    const [tab, setTab]       = useState("Buttons");
    const [loading, setLoad]  = useState(false);
    const [checks, setChecks] = useState({ a: true, b: false, c: false });
    const [radio, setRadio]   = useState("opt1");
    const [search, setSearch] = useState("");
   
    return (
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
   
        {/* ── Header ── */}
        <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-6 py-3.5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-orange-500 flex items-center justify-center">
                <span className="text-white text-xs font-black">UI</span>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 leading-none">Component Library</p>
                <p className="text-xs text-orange-500 font-medium">React · Tailwind · Orange Theme</p>
              </div>
            </div>
            <nav className="flex gap-1">
              {TABS.map(t => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={[
                    "px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150",
                    tab === t
                      ? "bg-orange-500 text-white shadow-sm"
                      : "text-gray-500 hover:bg-gray-100",
                  ].join(" ")}
                >
                  {t}
                </button>
              ))}
            </nav>
          </div>
        </header>
   
        <main className="max-w-5xl mx-auto px-6 py-10">
   
          {/* ════ BUTTONS ════ */}
          {tab === "Buttons" && (
            <>
              <Section title="Variants" subtitle="8 semantic button colours — primary always orange, others each carry meaning">
                <Row label="All variants">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="danger">Danger</Button>
                  <Button variant="success">Success</Button>
                  <Button variant="info">Info</Button>
                  <Button variant="warning">Warning</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="dark">Dark</Button>
                </Row>
              </Section>
   
              <Section title="Sizes" subtitle="sm · md · lg · xl">
                <Row>
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                  <Button size="xl">Extra Large</Button>
                </Row>
              </Section>
   
              <Section title="Icons" subtitle="Left icon · Right icon · Icon-only">
                <Row label="Left icon">
                  <Button leftIcon={<PlusIcon />}>New Item</Button>
                  <Button variant="secondary" leftIcon={<MailIcon />}>Send Mail</Button>
                  <Button variant="dark" leftIcon={<SearchIcon />}>Search</Button>
                </Row>
                <Row label="Right icon">
                  <Button rightIcon={<ArrowIcon />}>Continue</Button>
                  <Button variant="ghost" rightIcon={<ArrowIcon />}>Learn More</Button>
                </Row>
                <Row label="Icon only">
                  <Button iconOnly><span className="w-5 h-5"><PlusIcon /></span></Button>
                  <Button variant="secondary" iconOnly><span className="w-5 h-5"><SearchIcon /></span></Button>
                  <Button variant="danger" iconOnly><span className="w-5 h-5 flex items-center justify-center text-sm">🗑</span></Button>
                  <Button variant="dark" iconOnly><span className="w-5 h-5"><MailIcon /></span></Button>
                </Row>
              </Section>
   
              <Section title="States" subtitle="Loading · Disabled · Full width">
                <Row label="Loading">
                  <Button loading>Saving…</Button>
                  <Button variant="secondary" loading>Loading</Button>
                  <Button
                    variant="info"
                    loading={loading}
                    onClick={() => { setLoad(true); setTimeout(() => setLoad(false), 2000); }}
                  >
                    {loading ? "Processing…" : "Simulate Load"}
                  </Button>
                </Row>
                <Row label="Disabled">
                  <Button disabled>Primary</Button>
                  <Button variant="secondary" disabled>Secondary</Button>
                  <Button variant="danger" disabled>Danger</Button>
                </Row>
                <Row label="Full width">
                  <div className="w-full max-w-xs">
                    <Button fullWidth>Full Width Button</Button>
                  </div>
                </Row>
              </Section>
   
              <Section title="Button Group" subtitle="Fused buttons for toolbars and segmented controls">
                <Row>
                  <div className="inline-flex">
                    {["Day","Week","Month"].map((l, i, arr) => (
                      <Button
                        key={l}
                        variant="secondary"
                        size="sm"
                        className={
                          i === 0 ? "rounded-r-none"
                          : i === arr.length - 1 ? "rounded-l-none border-l-0"
                          : "rounded-none border-l-0"
                        }
                      >
                        {l}
                      </Button>
                    ))}
                  </div>
                  <div className="inline-flex">
                    <Button className="rounded-r-none">Save</Button>
                    <Button iconOnly className="rounded-l-none border-l border-orange-600 px-2.5 w-9">
                      <span className="text-sm">▾</span>
                    </Button>
                  </div>
                </Row>
              </Section>
            </>
          )}
   
          {/* ════ INPUTS ════ */}
          {tab === "Inputs" && (
            <>
              <Section title="Text Input" subtitle="default · filled variants with icons, clear button, and counter">
                <div className="grid md:grid-cols-2 gap-5">
                  <Input label="Default Input" placeholder="Enter value…" helperText="This is a helper message." />
                  <Input label="Filled Input" variant="filled" placeholder="Enter value…" />
                  <Input label="With Left Icon" leftIcon={<MailIcon />} placeholder="your@email.com" />
                  <Input label="Search + Clear" leftIcon={<SearchIcon />} clearable placeholder="Search anything…" value={search} onChange={e => setSearch(e.target.value)} />
                  <Input label="With Counter" maxLength={60} placeholder="Start typing…" helperText="Max 60 characters." />
                  <Input label="Password" type="password" placeholder="••••••••" />
                </div>
              </Section>
   
              <Section title="Validation States" subtitle="error · success · disabled">
                <div className="grid md:grid-cols-2 gap-5">
                  <Input label="Error State" state="error"   value="wrong@input" helperText="Please enter a valid email address." />
                  <Input label="Success State" state="success" value="valid@email.com" helperText="Email looks good!" />
                  <Input label="Disabled" disabled value="Read-only value" helperText="This field cannot be edited." />
                  <Input label="Required Field" required placeholder="Cannot be blank" helperText="This field is required." />
                </div>
              </Section>
   
              <Section title="Textarea" subtitle="Resizable with optional character counter">
                <div className="grid md:grid-cols-2 gap-5">
                  <Textarea label="Message" placeholder="Write your message…" helperText="Keep it clear and concise." rows={4} />
                  <Textarea label="Bio (limited)" placeholder="Tell us about yourself…" maxLength={200} rows={4} />
                  <Textarea label="Error State" state="error" value="Too short." helperText="Minimum 20 characters required." />
                  <Textarea label="Disabled" disabled value="This content is read-only." />
                </div>
              </Section>
   
              <Section title="Checkbox &amp; Radio" subtitle="Custom-styled to match the orange theme">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Checkboxes</p>
                    <div className="flex flex-col gap-3">
                      <Checkbox label="Option A — checked by default" checked={checks.a} onChange={e => setChecks(p => ({ ...p, a: e.target.checked }))} />
                      <Checkbox label="Option B" checked={checks.b} onChange={e => setChecks(p => ({ ...p, b: e.target.checked }))} />
                      <Checkbox label="Option C" checked={checks.c} onChange={e => setChecks(p => ({ ...p, c: e.target.checked }))} />
                      <Checkbox label="Disabled (checked)"   checked disabled />
                      <Checkbox label="Disabled (unchecked)" checked={false} disabled />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Radio Buttons</p>
                    <div className="flex flex-col gap-3">
                      {["opt1","opt2","opt3"].map((v, i) => (
                        <Radio key={v} name="plan" value={v} label={`Option ${i+1}${i===0?" (default)":""}`} checked={radio===v} onChange={() => setRadio(v)} />
                      ))}
                      <Radio name="plan" value="opt4" label="Disabled option" checked={false} onChange={() => {}} disabled />
                    </div>
                  </div>
                </div>
              </Section>
            </>
          )}
   
          {/* ════ CARDS ════ */}
          {tab === "Cards" && (
            <>
              <Section title="Card Variants" subtitle="default · elevated · outlined · filled — with Header, Body, Footer">
                <div className="grid md:grid-cols-2 gap-5">
                  {(["default","elevated","outlined","filled"] as const).map(v => (
                    <Card key={v} variant={v}>
                      <CardHeader withBorder>
                        <div className="flex items-center justify-between">
                          <CardTitle>{v.charAt(0).toUpperCase() + v.slice(1)} Card</CardTitle>
                          <CardBadge color={v === "outlined" ? "orange" : v === "filled" ? "orange" : "gray"}>{v}</CardBadge>
                        </div>
                        <CardDescription>Supports Header, Title, Description, Content, and Footer.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-500 leading-relaxed">
                          This is the <strong className="text-gray-700">{v}</strong> card variant. Use it for content grouping, dashboards, and structured data display.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <div className="flex gap-2">
                          <Button size="sm">Action</Button>
                          <Button size="sm" variant="ghost">Cancel</Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </Section>
   
              <Section title="Stat Cards" subtitle="KPI / metric cards for dashboards">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { title:"Total Revenue", value:"₹84.2K", change:"12.5% this month", pos:true,  iconColor:"orange", icon:<ChartIcon/> },
                    { title:"New Users",     value:"2,841",  change:"8.1% this week",  pos:true,  iconColor:"blue",   icon:<UserIcon/> },
                    { title:"Orders",        value:"1,294",  change:"3.2% drop",       pos:false, iconColor:"red",    icon:<CartIcon/> },
                    { title:"Avg. Rating",   value:"4.8 ★",  change:"0.2 vs last mo",  pos:true,  iconColor:"yellow", icon:<span className="text-lg">⭐</span> },
                  ].map(s => (
                    <Card key={s.title} hoverable>
                      <CardContent>
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-gray-500 truncate">{s.title}</p>
                            <p className="text-2xl font-bold text-gray-900 tracking-tight mt-1">{s.value}</p>
                            <p className={`text-xs font-semibold mt-1.5 ${s.pos ? "text-green-600" : "text-red-500"}`}>
                              {s.pos ? "↑" : "↓"} {s.change}
                            </p>
                          </div>
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            s.iconColor==="orange" ? "bg-orange-100 text-orange-500"
                            : s.iconColor==="blue" ? "bg-blue-100 text-blue-500"
                            : s.iconColor==="red"  ? "bg-red-100 text-red-500"
                            : "bg-yellow-100 text-yellow-500"
                          }`}>
                            <span className="w-5 h-5 block">{s.icon}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </Section>
   
              <Section title="Profile Cards" subtitle="User / team member display cards">
                <div className="grid md:grid-cols-3 gap-5">
                  {[
                    { name:"Arjun Mehta",  role:"Lead Designer",   bio:"Pixel-perfect interfaces since 2018. Obsessed with type.",  stats:[{label:"Projects",value:42},{label:"Reviews",value:128},{label:"Rating",value:"4.9"}] },
                    { name:"Priya Sharma", role:"Backend Engineer", bio:"Loves distributed systems and strong coffee.",               stats:[{label:"Commits",value:982},{label:"PRs",value:204},{label:"Stars",value:"1.2k"}] },
                    { name:"Rohan Das",    role:"Product Manager",  bio:"Turning user pain into clean roadmaps. Former founder.",     stats:[{label:"Products",value:7},{label:"Launches",value:31},{label:"NPS",value:72}] },
                  ].map(p => (
                    <Card key={p.name}>
                      <CardContent className="flex flex-col items-center text-center pt-6 gap-4">
                        <div className="w-14 h-14 rounded-2xl ring-4 ring-orange-100 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center flex-shrink-0">
                          <span className="text-2xl font-black text-white">{p.name[0]}</span>
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-gray-900">{p.name}</h3>
                          <p className="text-xs font-semibold text-orange-500 mt-0.5">{p.role}</p>
                          <p className="text-xs text-gray-500 mt-2 leading-relaxed">{p.bio}</p>
                        </div>
                        <div className="w-full flex divide-x divide-gray-100 border-t border-b border-gray-100 py-3">
                          {p.stats.map(s => (
                            <div key={s.label} className="flex-1 text-center">
                              <p className="text-sm font-bold text-gray-900">{s.value}</p>
                              <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2 w-full">
                          <Button size="sm" fullWidth>Follow</Button>
                          <Button size="sm" variant="secondary" fullWidth>Message</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </Section>
   
              <Section title="Product Cards" subtitle="E-commerce cards with rating, badge, and price">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { name:"Wireless Earbuds Pro Max", cat:"Audio",     price:"2,499", orig:"3,999", rating:4.8, badge:"Sale", emoji:"🎧" },
                    { name:"Minimalist Leather Watch", cat:"Wearables", price:"5,299", orig:null,    rating:4.6, badge:"New",  emoji:"⌚" },
                    { name:"Ergonomic Office Chair",   cat:"Furniture", price:"12,999",orig:"15,000",rating:4.7, badge:null,   emoji:"🪑" },
                    { name:"Cold Brew Coffee Kit",     cat:"Kitchen",   price:"1,799", orig:"2,199", rating:4.5, badge:"Hot",  emoji:"☕" },
                  ].map(p => (
                    <Card key={p.name} hoverable className="group">
                      <div className="relative h-40 bg-gradient-to-br from-orange-50 to-gray-100 flex items-center justify-center overflow-hidden">
                        <span className="text-5xl transition-transform duration-300 group-hover:scale-110">{p.emoji}</span>
                        {p.badge && (
                          <span className="absolute top-2.5 left-2.5 bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                            {p.badge}
                          </span>
                        )}
                      </div>
                      <CardContent className="py-3">
                        <p className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-1">{p.cat}</p>
                        <h3 className="text-xs font-bold text-gray-900 line-clamp-2 mb-2 leading-snug">{p.name}</h3>
                        <div className="flex items-center gap-0.5 mb-2">
                          {[1,2,3,4,5].map(s => (
                            <svg key={s} className={`w-3 h-3 ${s <= Math.round(p.rating) ? "text-orange-400" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                            </svg>
                          ))}
                          <span className="text-xs text-gray-400 ml-1">{p.rating}</span>
                        </div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-sm font-bold text-gray-900">₹{p.price}</span>
                          {p.orig && <span className="text-xs text-gray-400 line-through">₹{p.orig}</span>}
                        </div>
                      </CardContent>
                      <CardFooter withBorder={false} className="pt-0 px-5 pb-4">
                        <Button size="sm" fullWidth leftIcon={<CartIcon />}>Add to Cart</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </Section>
   
              <Section title="Interactive Behaviours" subtitle="hoverable · clickable">
                <div className="grid md:grid-cols-3 gap-5">
                  <Card hoverable>
                    <CardContent>
                      <CardBadge color="orange">hoverable</CardBadge>
                      <CardTitle className="mt-2 text-base">Hover Me</CardTitle>
                      <CardDescription>Lifts up with an orange-tinted shadow on hover.</CardDescription>
                    </CardContent>
                  </Card>
                  <Card variant="outlined" clickable>
                    <CardContent>
                      <CardBadge color="blue">clickable</CardBadge>
                      <CardTitle className="mt-2 text-base">Click Me</CardTitle>
                      <CardDescription>Presses down on click. Keyboard-accessible too.</CardDescription>
                    </CardContent>
                  </Card>
                  <Card variant="filled" hoverable>
                    <CardContent>
                      <CardBadge color="orange">filled + hover</CardBadge>
                      <CardTitle className="mt-2 text-base">Soft Orange Fill</CardTitle>
                      <CardDescription>Great for featured or highlighted content sections.</CardDescription>
                    </CardContent>
                  </Card>
                </div>
              </Section>
            </>
          )}
        </main>
   
        <footer className="border-t border-gray-100 mt-4 py-5 text-center">
          <p className="text-xs text-gray-400">UI Component Library · React + Tailwind CSS · Orange &amp; White Theme</p>
        </footer>
      </div>
    );
  }