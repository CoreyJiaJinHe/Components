import { useMemo, useState } from 'react'
import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import './App.css'
import {
  BookScraperPageLayout,
  BooksPageLayout,
  DownloadPageLayout,
  GenericNavbar,
  ToggleSwitch,
  UserPageLayout,
} from './UI'
import RightBar from './UI/RightBar'

const PAGE_LINKS = [
  { key: 'home', label: 'Home', href: '/' },
  { key: 'book-scraper', label: 'Book Scraper', href: '/book-scraper' },
  { key: 'books', label: 'Books', href: '/books' },
  { key: 'download', label: 'Download', href: '/download' },
  { key: 'user', label: 'User', href: '/user' },
]

const BOOKS = [
  {
    title: 'The Windbound Atlas',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.',
    totalChapters: 18,
  },
  {
    title: 'Fragments of a Quiet Star',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    totalChapters: 26,
  },
  {
    title: 'A Study in Ember and Rain',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet.',
    totalChapters: 12,
  },
  {
    title: 'Northern Current Chronicles',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean lacinia bibendum nulla sed.',
    totalChapters: 31,
  },
]

const SITES = ['Royal Road', 'Scribble Hub', 'Archive of Our Own', 'FanFiction.net', 'SpaceBattles']

function ContentCard({ title, children }) {
  return (
    <article className="Component-App-Content-Card-Container">
      <h2 className="Component-App-Content-Card-Title">{title}</h2>
      <div className="Component-App-Content-Card-Body">{children}</div>
    </article>
  )
}

function PageSection({ title, children }) {
  return (
    <section className="Component-App-Page-Section">
      <header className="Component-App-Page-Header">
        <h1 className="Component-App-Page-Title">{title}</h1>
      </header>
      {children}
    </section>
  )
}

function HomePreview() {
  return (
    <section className="Home-Page-Container">
      <h1 className="Home-Page-Title">WELCOME TO HOME PAGE</h1>
    </section>
  )
}

function BookScraperPreview() {
  return (
    <PageSection title="Book Scraper Page Layout">
      <BookScraperPageLayout />
    </PageSection>
  )
}

function BooksPreview({ showAdultWorks, setShowAdultWorks }) {
  return (
    <PageSection title="Books Page Layout">
      <>
        <BooksPageLayout
          heading={null}
          sidebar={
            <ContentCard title="List of Sites">
              <ul className="Books-Page-Site-List">
                {SITES.map((site) => (
                  <li key={site}>{site}</li>
                ))}
              </ul>
              <ToggleSwitch
                label="Show Adult Works?"
                checked={showAdultWorks}
                onCheckedChange={setShowAdultWorks}
              />
            </ContentCard>
          }
          content={
            <ContentCard title="Books">
              <section className="Books-Page-Grid-Section">
                {BOOKS.map((book) => (
                  <article key={book.title} className="Books-Page-Card-Container">
                    <h3>{book.title}</h3>
                    <p>{book.description}</p>
                    <p>
                      <strong>Total Chapters:</strong> {book.totalChapters}
                    </p>
                  </article>
                ))}
              </section>
            </ContentCard>
          }
        />
        {showAdultWorks ? (
          <div className="Component-App-Modal-Container" role="dialog" aria-modal="false">
            <strong>Adult Works Enabled</strong>
            <p>Additional adult works would appear in the books list.</p>
          </div>
        ) : null}
      </>
    </PageSection>
  )
}

function DownloadPreview() {
  return (
    <PageSection title="Download Page Layout">
      <DownloadPageLayout
        header={null}
        main={
          <section className="Component-App-Grid-Section">
            <ContentCard title="Available Data">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </ContentCard>
            <ContentCard title="READ ME">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <p>Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
            </ContentCard>
          </section>
        }
      />
    </PageSection>
  )
}

function UserPreview({ showModal, enableBurnable = false}) {
  return (
    <UserPageLayout
      enableBurnable={enableBurnable}
      content={
        <ContentCard title="User Profile">
          <strong>Person Name Here:</strong>
          <p>You're looking at a generic user profile.</p>
          <p>They like various things.</p>
        </ContentCard>
      }
      modal={
        showModal ? (
          <div className="Component-App-Modal-Container" role="dialog" aria-modal="false">
            <strong>User Info Modal</strong>
            <p>I am a little bar in the bottom right!</p>
          </div>
        ) : null
      }
    />
  )
}

function App() {
  const [showModal, setShowModal] = useState(true)
  const [showAdultWorks, setShowAdultWorks] = useState(false)
  const [enableBurnable, setEnableBurnable] = useState(false)
  const [isRightBarOpen, setIsRightBarOpen] = useState(false)
  const [nightMode, setNightMode] = useState(false)

  const nav = useMemo(
    () => (
      <GenericNavbar
        leftLinks={PAGE_LINKS}
        centerLinks={[{ key: 'health', label: 'API Health', href: 'http://127.0.0.1:8000/api/health' }]}
        rightContent={null}
        renderLink={(link, className) => {
          const href = link?.href ?? '/'
          const isExternal = href.startsWith('http://') || href.startsWith('https://')
          if (isExternal) {
            return (
              <a className={className} href={href} target="_blank" rel="noreferrer">
                {link?.label}
              </a>
            )
          }
          return (
            <NavLink
              to={href}
              className={({ isActive }) => `${className}${isActive ? ' Component-App-Nav-Link-Active' : ''}`}
            >
              {link?.label}
            </NavLink>
          )
        }}
      />
    ),
    [],
  )

  return (
    <div className={nightMode ? 'Component-App-Theme-Container Component-App-Theme-Night' : 'Component-App-Theme-Container Component-App-Theme-Day'}>
      {nav}
      <RightBar
        isRightBarOpen={isRightBarOpen}
        setIsRightBarOpen={setIsRightBarOpen}
        nightMode={nightMode}
        setNightMode={setNightMode}
        showModal={showModal}
        setShowModal={setShowModal}
        enableBurnable={enableBurnable}
        setEnableBurnable={setEnableBurnable}
      />
      <Routes>
        <Route path="/" element={<HomePreview />} />
        <Route path="/book-scraper" element={<BookScraperPreview />} />
        <Route path="/books" element={<BooksPreview showAdultWorks={showAdultWorks} setShowAdultWorks={setShowAdultWorks} />} />
        <Route path="/download" element={<DownloadPreview />} />
        <Route path="/user" element={<UserPreview showModal={showModal} enableBurnable={enableBurnable} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
