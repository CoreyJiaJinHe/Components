"""Reusable graph/table components for the database visualizer.

This module is intentionally standalone so existing visualizer code can remain unchanged.
Each builder accepts input arguments and returns a finished matplotlib Figure or PyQt widget.
"""

from typing import Any, Callable, Mapping, Optional, Sequence

_VISUALIZER_DEPS: Optional[dict[str, Any]] = None
_VISUALIZER_IMPORT_ERROR: Optional[ImportError] = None


def _get_visualizer_dependencies() -> Optional[dict[str, Any]]:
    """Load and cache UI/plotting dependencies on first use."""
    global _VISUALIZER_DEPS, _VISUALIZER_IMPORT_ERROR

    if _VISUALIZER_DEPS is not None:
        return _VISUALIZER_DEPS
    if _VISUALIZER_IMPORT_ERROR is not None:
        return None

    try:
        QtCore = __import__("PyQt5.QtCore", fromlist=["Qt"])
        QtWidgets = __import__(
            "PyQt5.QtWidgets",
            fromlist=[
                "QGridLayout",
                "QGroupBox",
                "QLabel",
                "QScrollArea",
                "QSizePolicy",
                "QTableWidget",
                "QTableWidgetItem",
                "QVBoxLayout",
                "QWidget",
            ],
        )
        FigureModule = __import__("matplotlib.figure", fromlist=["Figure"])
    except ImportError as exc:
        _VISUALIZER_IMPORT_ERROR = exc
        return None

    _VISUALIZER_DEPS = {
        "Qt": QtCore.Qt,
        "QGridLayout": QtWidgets.QGridLayout,
        "QGroupBox": QtWidgets.QGroupBox,
        "QLabel": QtWidgets.QLabel,
        "QScrollArea": QtWidgets.QScrollArea,
        "QSizePolicy": QtWidgets.QSizePolicy,
        "QTableWidget": QtWidgets.QTableWidget,
        "QTableWidgetItem": QtWidgets.QTableWidgetItem,
        "QVBoxLayout": QtWidgets.QVBoxLayout,
        "QWidget": QtWidgets.QWidget,
        "Figure": FigureModule.Figure,
    }
    return _VISUALIZER_DEPS


def ensure_visualizer_dependencies() -> None:
    """Raise a clear error when required UI/plotting dependencies are unavailable."""
    dependencies = _get_visualizer_dependencies()
    if dependencies is None:
        raise RuntimeError(
            f"Visualizer dependencies missing: {_VISUALIZER_IMPORT_ERROR}. "
            "Install with: pip install PyQt5 matplotlib"
        )
    return dependencies


def _autopct_with_counts(values: Sequence[float]) -> Callable[[float], str]:
    total = float(sum(values))

    def formatter(pct: float) -> str:
        if total <= 0:
            return ""
        count = int(round((pct / 100.0) * total))
        return f"{count} ({pct:.1f}%)"

    return formatter


def create_game_type_distribution_figure(
    game_type_labels: Sequence[str],
    game_type_values: Sequence[int],
    *,
    title: str = "Game Type Distribution",
    figsize: tuple[float, float] = (5.8, 4.3),
    startangle: int = 130,
    one_slice_color: str = "#5b8ff9",
    empty_color: str = "#cfd8dc",
) -> Any:
    """Build and return a pie chart figure for game type distribution."""
    dependencies = ensure_visualizer_dependencies()
    Figure = dependencies["Figure"]

    figure = Figure(figsize=figsize)
    axis = figure.add_subplot(111)

    values = [int(v) for v in game_type_values if int(v) > 0]
    labels = [str(label) for label in game_type_labels]

    if values and sum(values) > 0:
        if len(values) == 1:
            axis.pie(
                [1],
                labels=[labels[0] if labels else "Game Type"],
                startangle=90,
                colors=[one_slice_color],
                wedgeprops={"edgecolor": "white"},
            )
            axis.text(0, 0, f"{values[0]} (100.0%)", ha="center", va="center", fontsize=10)
        else:
            axis.pie(
                values,
                labels=labels,
                autopct=_autopct_with_counts(values),
                startangle=startangle,
                wedgeprops={"edgecolor": "white"},
            )
    else:
        axis.pie(
            [1],
            labels=["No Games"],
            colors=[empty_color],
            startangle=90,
            wedgeprops={"edgecolor": "white"},
        )
        axis.text(0, 0, "0 games", ha="center", va="center", fontsize=10)

    axis.set_title(title)
    axis.axis("equal")
    figure.tight_layout()
    return figure


def create_wins_losses_figure(
    wins_count: int,
    losses_count: int,
    *,
    title_prefix: str = "Wins vs Losses",
    figsize: tuple[float, float] = (5.8, 4.3),
    wins_color: str = "#2a9d8f",
    losses_color: str = "#e76f51",
    empty_color: str = "#cfd8dc",
) -> Any:
    """Build and return a pie chart figure for win/loss distribution."""
    dependencies = ensure_visualizer_dependencies()
    Figure = dependencies["Figure"]

    figure = Figure(figsize=figsize)
    axis = figure.add_subplot(111)

    total_games = int(wins_count) + int(losses_count)
    if total_games > 0:
        values = [int(wins_count), int(losses_count)]
        labels = [f"Wins ({wins_count})", f"Losses ({losses_count})"]
        axis.pie(
            values,
            labels=labels,
            autopct=_autopct_with_counts(values),
            startangle=90,
            colors=[wins_color, losses_color],
            wedgeprops={"edgecolor": "white"},
        )
    else:
        axis.pie(
            [1],
            labels=["No Games"],
            colors=[empty_color],
            startangle=90,
            wedgeprops={"edgecolor": "white"},
        )
        axis.text(0, 0, "0 wins / 0 losses", ha="center", va="center", fontsize=10)

    axis.set_title(f"{title_prefix} (Total Games: {total_games})")
    axis.axis("equal")
    figure.tight_layout()
    return figure


def create_losses_by_bot_figure(
    bot_labels: Sequence[str],
    bot_loss_values: Sequence[int],
    *,
    title: str = "Losses by Bot",
    y_label: str = "Losses",
    figsize: tuple[float, float] = (5.8, 4.3),
    bar_color: str = "#457b9d",
    empty_note_subject: str = "player",
) -> Any:
    """Build and return a bar chart figure for losses by bot."""
    dependencies = ensure_visualizer_dependencies()
    Figure = dependencies["Figure"]

    figure = Figure(figsize=figsize)
    axis = figure.add_subplot(111)

    labels = list(bot_labels) if bot_labels else ["No Bots"]
    values = [int(v) for v in bot_loss_values] if bot_loss_values else [0]

    bars = axis.bar(labels, values, color=bar_color)
    axis.set_ylabel(y_label)
    axis.set_title(title)
    axis.set_axisbelow(True)
    axis.grid(axis="y", alpha=0.25)
    axis.tick_params(axis="x", rotation=20)

    max_loss_value = max(values) if values else 0
    axis.set_ylim(0, max(1, max_loss_value + 1))

    for bar, value in zip(bars, values):
        axis.text(
            bar.get_x() + bar.get_width() / 2.0,
            bar.get_height() + 0.05,
            str(value),
            ha="center",
            va="bottom",
        )

    if sum(values) == 0:
        axis.text(0.5, 0.92, f"No bot losses for {empty_note_subject}", transform=axis.transAxes, ha="center", va="center")

    figure.tight_layout()
    return figure


def create_table_widget(
    headers: Sequence[str],
    rows: Sequence[Sequence[Any]],
    *,
    alternating_row_colors: bool = True,
    sorting_enabled: bool = False,
    min_height: Optional[int] = None,
    max_height: Optional[int] = None,
) -> Any:
    """Create a generic QTableWidget from headers and row arrays."""
    dependencies = ensure_visualizer_dependencies()
    QTableWidget = dependencies["QTableWidget"]
    QTableWidgetItem = dependencies["QTableWidgetItem"]

    table_widget = QTableWidget()
    table_widget.setColumnCount(len(headers))
    table_widget.setHorizontalHeaderLabels([str(h) for h in headers])
    table_widget.setRowCount(len(rows))
    table_widget.setAlternatingRowColors(alternating_row_colors)
    table_widget.setSortingEnabled(sorting_enabled)

    if min_height is not None:
        table_widget.setMinimumHeight(min_height)
    if max_height is not None:
        table_widget.setMaximumHeight(max_height)

    for row_index, row_values in enumerate(rows):
        for column_index, cell_value in enumerate(row_values):
            text = "NULL" if cell_value is None else str(cell_value)
            table_widget.setItem(row_index, column_index, QTableWidgetItem(text))

    header = table_widget.horizontalHeader()
    header.setStretchLastSection(True)
    table_widget.resizeColumnsToContents()
    return table_widget


def create_summary_table_widget(
    summary_rows: Sequence[Mapping[str, Any]],
    *,
    headers: Sequence[str] = ("Player", "Wallet", "Winnings Total", "Games", "Wins", "Losses", "Win %"),
    keys: Sequence[str] = ("player", "wallet", "winnings_total", "games", "wins", "losses", "win_rate"),
) -> Any:
    """Create a ready-to-use summary table widget from dict rows."""
    table_rows = [[row.get(key, "") for key in keys] for row in summary_rows]
    return create_table_widget(headers, table_rows)


def create_database_tables_grid_widget(
    tables_with_records: Sequence[Mapping[str, Any]],
    *,
    max_columns: int = 2,
    table_name_transform: Optional[Callable[[str], str]] = None,
    column_name_transform: Optional[Callable[[str], str]] = None,
    min_table_height: int = 230,
    max_table_height: int = 320,
) -> Any:
    """Create a scrollable 2-column grid of table panels.

    Expected input format for each table item:
    {
        'name': <table_name>,
        'columns': [<column_name>, ...],
        'rows': [sqlite3.Row|Mapping, ...]
    }
    """
    dependencies = ensure_visualizer_dependencies()
    Qt = dependencies["Qt"]
    QGridLayout = dependencies["QGridLayout"]
    QGroupBox = dependencies["QGroupBox"]
    QLabel = dependencies["QLabel"]
    QScrollArea = dependencies["QScrollArea"]
    QSizePolicy = dependencies["QSizePolicy"]
    QVBoxLayout = dependencies["QVBoxLayout"]
    QWidget = dependencies["QWidget"]

    name_transform = table_name_transform or (lambda raw_name: raw_name)
    column_transform = column_name_transform or (lambda raw_name: raw_name)

    root_widget = QWidget()
    root_layout = QVBoxLayout()
    root_widget.setLayout(root_layout)

    scroll_area = QScrollArea()
    scroll_area.setWidgetResizable(True)
    root_layout.addWidget(scroll_area)

    scroll_content = QWidget()
    grid_layout = QGridLayout()
    grid_layout.setHorizontalSpacing(12)
    grid_layout.setVerticalSpacing(12)
    scroll_content.setLayout(grid_layout)
    scroll_area.setWidget(scroll_content)

    if not tables_with_records:
        grid_layout.addWidget(QLabel("No tables found in the database."), 0, 0)
        return root_widget

    for index, table_data in enumerate(tables_with_records):
        row_index = index // max(1, max_columns)
        col_index = index % max(1, max_columns)

        raw_table_name = str(table_data.get("name", "Unnamed Table"))
        table_columns = list(table_data.get("columns", []))
        table_records = list(table_data.get("rows", []))

        panel = QGroupBox(f"{name_transform(raw_table_name)} ({len(table_records)} rows)")
        panel_layout = QVBoxLayout()

        display_headers = [column_transform(str(column_name)) for column_name in table_columns]
        rows_data = []
        for record in table_records:
            record_row = []
            for column_name in table_columns:
                if hasattr(record, "keys") and column_name in record.keys():
                    record_row.append(record[column_name])
                else:
                    record_row.append("")
            rows_data.append(record_row)

        records_table = create_table_widget(
            headers=display_headers,
            rows=rows_data,
            alternating_row_colors=True,
            sorting_enabled=False,
            min_height=min_table_height,
            max_height=max_table_height,
        )
        records_table.setSizePolicy(QSizePolicy.Expanding, QSizePolicy.Fixed)
        records_table.setVerticalScrollBarPolicy(Qt.ScrollBarAsNeeded)
        records_table.setHorizontalScrollBarPolicy(Qt.ScrollBarAsNeeded)

        panel_layout.addWidget(records_table)
        panel.setLayout(panel_layout)
        grid_layout.addWidget(panel, row_index, col_index)

    for col in range(max(1, max_columns)):
        grid_layout.setColumnStretch(col, 1)

    return root_widget
