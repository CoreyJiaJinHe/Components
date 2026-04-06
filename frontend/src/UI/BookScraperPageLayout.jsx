import React, { useMemo, useState } from "react";
import "./BookScraperPageLayout.css";

const DEFAULT_RESULTS = [
	{
		id: "shards-of-the-last-dawn",
		title: "Shards of the Last Dawn",
		author: "E. Calder",
		hostSite: "Royal Road",
		genre: "Fantasy, Adventure",
		rating: 4.7,
		chapters: 87,
		favourites: 142,
		viewed: 1284,
	},
	{
		id: "orbitfall-city-of-ash",
		title: "Orbitfall: City of Ash",
		author: "Mira Tane",
		hostSite: "Scribble Hub",
		genre: "Sci-Fi, Mystery",
		rating: 4.3,
		chapters: 54,
		favourites: 98,
		viewed: 902,
	},
	{
		id: "letters-to-the-hollow-moon",
		title: "Letters to the Hollow Moon",
		author: "N. Vale",
		hostSite: "Archive of Our Own",
		genre: "Romance, Drama",
		rating: 4.8,
		chapters: 26,
		favourites: 214,
		viewed: 1563,
	},
];

/**
 * Generic layout extracted from the Book Scraper Page.
 *
 * Props:
 * - overlay: ReactNode (popups, dialogs)
 * - nav: ReactNode
 * - leftPanel: ReactNode
 * - main: ReactNode
 * - rightPanel: ReactNode
 */
function BookScraperPageLayout({
	overlay = null,
	nav = null,
	leftPanel = null,
	main = null,
	rightPanel = null,
}) {
	const [hasSearched, setHasSearched] = useState(false);
	const [selectedResultId, setSelectedResultId] = useState(null);

	const selectedResult = useMemo(
		() => DEFAULT_RESULTS.find((result) => result.id === selectedResultId) ?? null,
		[selectedResultId],
	);

	const defaultLeftPanel = (
		<form
			className="Book-Page-Scraper-Filters-Form"
			onSubmit={(event) => {
				event.preventDefault();
				setHasSearched(true);
				setSelectedResultId(null);
			}}
		>
			<h3 className="Book-Page-Scraper-Section-Heading">Filters</h3>

			<label className="Book-Page-Scraper-Field-Label" htmlFor="filter-search-query">
				Search Query
			</label>
			<input
				id="filter-search-query"
				type="text"
				placeholder="Enter title, author, or tag"
				className="Book-Page-Scraper-Field-Input"
			/>

			<label className="Book-Page-Scraper-Field-Label" htmlFor="filter-host-site">
				Host Site
			</label>
			<select id="filter-host-site" className="Book-Page-Scraper-Field-Select" defaultValue="all">
				<option value="all">All Sites</option>
				<option value="royal-road">Royal Road</option>
				<option value="scribble-hub">Scribble Hub</option>
				<option value="ao3">Archive of Our Own</option>
				<option value="fanfiction">FanFiction.net</option>
			</select>

			<label className="Book-Page-Scraper-Field-Label" htmlFor="filter-genre">
				Genre
			</label>
			<select id="filter-genre" className="Book-Page-Scraper-Field-Select" defaultValue="fantasy">
				<option value="fantasy">Fantasy</option>
				<option value="sci-fi">Sci-Fi</option>
				<option value="mystery">Mystery</option>
				<option value="romance">Romance</option>
				<option value="slice-of-life">Slice of Life</option>
			</select>

			<label className="Book-Page-Scraper-Field-Label" htmlFor="filter-sort-order">
				Sort Results
			</label>
			<select id="filter-sort-order" className="Book-Page-Scraper-Field-Select" defaultValue="updated-desc">
				<option value="updated-desc">Recently Updated</option>
				<option value="rating-desc">Highest Rated</option>
				<option value="views-desc">Most Viewed</option>
				<option value="title-asc">Title A-Z</option>
			</select>

			<div className="Book-Page-Scraper-Range-Fields">
				<div className="Book-Page-Scraper-Range-Field-Group">
					<label className="Book-Page-Scraper-Field-Label" htmlFor="filter-min-chapters">
						Min Chapters
					</label>
					<input
						id="filter-min-chapters"
						type="number"
						min="1"
						defaultValue="10"
						className="Book-Page-Scraper-Field-Input"
					/>
				</div>
				<div className="Book-Page-Scraper-Range-Field-Group">
					<label className="Book-Page-Scraper-Field-Label" htmlFor="filter-min-rating">
						Min Rating
					</label>
					<input
						id="filter-min-rating"
						type="number"
						min="0"
						max="5"
						step="0.1"
						defaultValue="3.5"
						className="Book-Page-Scraper-Field-Input"
					/>
				</div>
			</div>

			<label className="Book-Page-Scraper-Field-Label" htmlFor="filter-status">
				Status
			</label>
			<select id="filter-status" className="Book-Page-Scraper-Field-Select" defaultValue="ongoing">
				<option value="ongoing">Ongoing</option>
				<option value="completed">Completed</option>
				<option value="hiatus">Hiatus</option>
			</select>

			<div className="Book-Page-Scraper-Checkbox-Group" role="group" aria-label="Extra filters">
				<label className="Book-Page-Scraper-Checkbox-Label">
					<input type="checkbox" defaultChecked /> Include mature content
				</label>
				<label className="Book-Page-Scraper-Checkbox-Label">
					<input type="checkbox" /> Only bookmarked authors
				</label>
			</div>

			<button type="submit" className="Book-Page-Scraper-Search-Button">
				Search
			</button>
		</form>
	);

	const defaultMainPanel = (
		<div className="Book-Page-Scraper-Results-Section">
			<h3 className="Book-Page-Scraper-Section-Heading">Results</h3>
			{hasSearched ? (
				DEFAULT_RESULTS.map((book) => (
					<button
						key={book.id}
						type="button"
						className={`Book-Page-Scraper-Result-Card ${selectedResultId === book.id ? "Book-Page-Scraper-Result-Card-Selected" : ""}`}
						onClick={() => setSelectedResultId(book.id)}
					>
						<h4 className="Book-Page-Scraper-Result-Title">{book.title}</h4>
						<p><strong>Author:</strong> {book.author}</p>
						<p><strong>Host Site:</strong> {book.hostSite}</p>
						<p><strong>Genre:</strong> {book.genre}</p>
						<p><strong>Rating:</strong> {book.rating.toFixed(1)} / 5</p>
						<p><strong>Chapters:</strong> {book.chapters}</p>
					</button>
				))
			) : (
				<p className="Book-Page-Scraper-Results-Empty-State">
					Press Search to load results.
				</p>
			)}
		</div>
	);

	const defaultRightPanel = (
		<div className="Book-Page-Scraper-Statistics-Section">
			<h3 className="Book-Page-Scraper-Section-Heading">Statistics</h3>
			{selectedResult ? (
				<>
					<div className="Book-Page-Scraper-Statistic-Row">
						<span className="Book-Page-Scraper-Statistic-Label">Favourites</span>
						<strong className="Book-Page-Scraper-Statistic-Value">{selectedResult.favourites}</strong>
					</div>
					<div className="Book-Page-Scraper-Statistic-Row">
						<span className="Book-Page-Scraper-Statistic-Label">Viewed</span>
						<strong className="Book-Page-Scraper-Statistic-Value">{selectedResult.viewed.toLocaleString()}</strong>
					</div>
					<div className="Book-Page-Scraper-Statistic-Row">
						<span className="Book-Page-Scraper-Statistic-Label">Average Rating</span>
						<strong className="Book-Page-Scraper-Statistic-Value">{selectedResult.rating.toFixed(1)}</strong>
					</div>
					<div className="Book-Page-Scraper-Statistic-Row">
						<span className="Book-Page-Scraper-Statistic-Label">Books Tracked</span>
						<strong className="Book-Page-Scraper-Statistic-Value">{DEFAULT_RESULTS.length}</strong>
					</div>
				</>
			) : (
				<p className="Book-Page-Scraper-Statistics-Empty-State">
					Select a result card to view statistics.
				</p>
			)}
		</div>
	);

	const resolvedLeftPanel = leftPanel ?? defaultLeftPanel;
	const resolvedMain = main ?? defaultMainPanel;
	const resolvedRightPanel = rightPanel ?? defaultRightPanel;

	return (
		<>
			{overlay}
			{nav}
			<div className="Book-Page-Scraper-Layout-Background">
				<div className="Book-Page-Scraper-Layout-Container">
					{resolvedLeftPanel && <aside className="Book-Page-Scraper-Layout-Left-Aside">{resolvedLeftPanel}</aside>}
					<section className="Book-Page-Scraper-Layout-Main-Section">{resolvedMain}</section>
					{resolvedRightPanel && <aside className="Book-Page-Scraper-Layout-Right-Aside">{resolvedRightPanel}</aside>}
				</div>
			</div>
		</>
	);
}

export default BookScraperPageLayout;
