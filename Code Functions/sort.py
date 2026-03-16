import os
import time


def _emit_state(arr, on_step=None, note=""):
    """Send a snapshot of the current array state to the visualization callback."""
    if on_step is not None:
        on_step(list(arr), note)


def bubble_sort(arr, on_step=None):
    # How it works: repeatedly compares adjacent elements and swaps them if out of order;
    # each pass pushes the largest remaining value to the end.
    # Time complexity: best O(n) with early-exit optimization, average/worst O(n^2).
    # Space complexity: O(1) auxiliary (in-place).
    n = len(arr)
    _emit_state(arr, on_step, "start")
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
                _emit_state(arr, on_step, f"swap {j}<->{j + 1}")
        if not swapped:
            break
    return arr


def selection_sort(arr, on_step=None):
    # How it works: repeatedly selects the minimum value from the unsorted suffix
    # and swaps it into the next sorted position.
    # Time complexity: best/average/worst O(n^2).
    # Space complexity: O(1) auxiliary (in-place).
    n = len(arr)
    _emit_state(arr, on_step, "start")
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        if min_idx != i:
            arr[i], arr[min_idx] = arr[min_idx], arr[i]
            _emit_state(arr, on_step, f"place min at {i}")
    return arr


def insertion_sort(arr, on_step=None):
    # How it works: builds a sorted prefix one element at a time by shifting larger
    # items right and inserting the current key into its correct location.
    # Time complexity: best O(n), average/worst O(n^2).
    # Space complexity: O(1) auxiliary (in-place).
    _emit_state(arr, on_step, "start")
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and key < arr[j]:
            arr[j + 1] = arr[j]
            j -= 1
            _emit_state(arr, on_step, f"shift for key {key}")
        arr[j + 1] = key
        _emit_state(arr, on_step, f"insert key {key}")
    return arr


def merge_sort(arr, on_step=None):
    # How it works: divide-and-conquer; recursively splits the array, sorts each half,
    # then merges the two sorted halves back together.
    # Time complexity: best/average/worst O(n log n).
    # Space complexity: O(n) auxiliary for merge buffer plus O(log n) recursion stack.
    n = len(arr)
    if n <= 1:
        _emit_state(arr, on_step, "trivial")
        return arr

    temp = [0] * n
    _emit_state(arr, on_step, "start")

    def _merge_sort(left, right):
        if right - left <= 1:
            return

        mid = (left + right) // 2
        _merge_sort(left, mid)
        _merge_sort(mid, right)

        i = left
        j = mid
        k = left

        while i < mid and j < right:
            if arr[i] <= arr[j]:
                temp[k] = arr[i]
                i += 1
            else:
                temp[k] = arr[j]
                j += 1
            k += 1

        while i < mid:
            temp[k] = arr[i]
            i += 1
            k += 1

        while j < right:
            temp[k] = arr[j]
            j += 1
            k += 1

        for idx in range(left, right):
            arr[idx] = temp[idx]
            _emit_state(arr, on_step, f"merge {left}:{right}")

    _merge_sort(0, n)
    return arr


def quick_sort(arr, on_step=None):
    # How it works: chooses a pivot, partitions elements into <= pivot and > pivot regions,
    # then recursively sorts each partition.
    # Time complexity: best/average O(n log n), worst O(n^2) with poor pivot splits.
    # Space complexity: O(log n) average recursion stack, O(n) worst stack depth.
    _emit_state(arr, on_step, "start")

    def _partition(low, high):
        pivot = arr[high]
        i = low - 1
        for j in range(low, high):
            if arr[j] <= pivot:
                i += 1
                if i != j:
                    arr[i], arr[j] = arr[j], arr[i]
                    _emit_state(arr, on_step, f"partition swap {i}<->{j}")
        if i + 1 != high:
            arr[i + 1], arr[high] = arr[high], arr[i + 1]
            _emit_state(arr, on_step, f"pivot -> {i + 1}")
        return i + 1

    def _quick_sort(low, high):
        if low < high:
            p = _partition(low, high)
            _quick_sort(low, p - 1)
            _quick_sort(p + 1, high)

    _quick_sort(0, len(arr) - 1)
    return arr


def heap_sort(arr, on_step=None):
    # How it works: builds a max-heap, then repeatedly moves the max element to the end
    # and heapifies the reduced heap.
    # Time complexity: best/average/worst O(n log n).
    # Space complexity: O(1) auxiliary (in-place iterative heap operations).
    _emit_state(arr, on_step, "start")

    def heapify(a, n, i):
        largest = i
        left = 2 * i + 1
        right = 2 * i + 2

        if left < n and a[left] > a[largest]:
            largest = left
        if right < n and a[right] > a[largest]:
            largest = right

        if largest != i:
            a[i], a[largest] = a[largest], a[i]
            _emit_state(arr, on_step, f"heapify swap {i}<->{largest}")
            heapify(a, n, largest)

    n = len(arr)
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)

    for i in range(n - 1, 0, -1):
        arr[i], arr[0] = arr[0], arr[i]
        _emit_state(arr, on_step, f"extract max -> {i}")
        heapify(arr, i, 0)

    return arr


def counting_sort(arr, on_step=None):
    # How it works: counts frequency of each integer key, then reconstructs output by
    # repeating each value according to its count.
    # Time complexity: O(n + k), where k is the value range (max - min + 1).
    # Space complexity: O(k) for counts and O(n) for output.
    if not arr:
        return arr

    min_val = min(arr)
    max_val = max(arr)
    value_range = max_val - min_val + 1
    count = [0] * value_range

    for num in arr:
        count[num - min_val] += 1

    sorted_arr = []
    for offset, c in enumerate(count):
        value = offset + min_val
        if c:
            sorted_arr.extend([value] * c)
            _emit_state(sorted_arr, on_step, f"append value {value}")

    return sorted_arr


def radix_sort(arr, on_step=None):
    # How it works: stable digit-by-digit sorting (least-significant digit first),
    # using counting sort for each digit position.
    # Time complexity: O(d * (n + b)), where d is digit count and b is base (10 here).
    # Space complexity: O(n + b).
    if not arr:
        return arr

    if any(num < 0 for num in arr):
        raise ValueError("radix_sort in this implementation supports non-negative integers only")

    _emit_state(arr, on_step, "start")

    def _counting_sort_by_digit(a, exp):
        n = len(a)
        output = [0] * n
        count = [0] * 10

        for i in range(n):
            digit = (a[i] // exp) % 10
            count[digit] += 1

        for i in range(1, 10):
            count[i] += count[i - 1]

        for i in range(n - 1, -1, -1):
            digit = (a[i] // exp) % 10
            output[count[digit] - 1] = a[i]
            count[digit] -= 1

        for i in range(n):
            a[i] = output[i]

        _emit_state(a, on_step, f"digit exp={exp}")

    max_val = max(arr)
    exp = 1
    while max_val // exp > 0:
        _counting_sort_by_digit(arr, exp)
        exp *= 10

    return arr


def bucket_sort(arr, on_step=None):
    # How it works: distributes values into buckets by numeric range, sorts each bucket,
    # then concatenates buckets.
    # Time complexity: average O(n + k) (or near O(n) with even distribution),
    # worst O(n^2) if data clusters badly and bucket sorting degrades.
    # Space complexity: O(n + k) for buckets/output.
    n = len(arr)
    if n == 0:
        return arr

    min_val = min(arr)
    max_val = max(arr)
    if min_val == max_val:
        return arr[:]

    bucket_count = n
    bucket_range = (max_val - min_val) / bucket_count
    buckets = [[] for _ in range(bucket_count)]

    for num in arr:
        index = int((num - min_val) / bucket_range)
        if index >= bucket_count:
            index = bucket_count - 1
        buckets[index].append(num)

    sorted_arr = []
    for idx, bucket in enumerate(buckets):
        if bucket:
            bucket.sort()
            sorted_arr.extend(bucket)
            _emit_state(sorted_arr, on_step, f"bucket {idx} merged")

    return sorted_arr


def shell_sort(arr, on_step=None):
    # How it works: generalized insertion sort with diminishing gaps, enabling far-apart
    # elements to move closer to their final position early.
    # Time complexity: depends on gap sequence; with simple halving gaps, worst O(n^2),
    # typical around O(n^(3/2)) to O(n log^2 n) in practice.
    # Space complexity: O(1) auxiliary (in-place).
    n = len(arr)
    gap = n // 2
    _emit_state(arr, on_step, "start")

    while gap > 0:
        for i in range(gap, n):
            temp = arr[i]
            j = i
            while j >= gap and arr[j - gap] > temp:
                arr[j] = arr[j - gap]
                j -= gap
                _emit_state(arr, on_step, f"gap {gap} shift")
            arr[j] = temp
            _emit_state(arr, on_step, f"gap {gap} insert")
        gap //= 2

    return arr


def tim_sort(arr, on_step=None):
    # How it works: simplified Timsort-like process: sorts small runs, then merges runs
    # with increasing run sizes (this implementation uses Python's sorted per run/merge pass).
    # Time complexity: best O(n), average/worst O(n log n).
    # Space complexity: O(n) due to temporary lists created by sorted/slicing.
    min_run = 32
    n = len(arr)
    _emit_state(arr, on_step, "start")

    for i in range(0, n, min_run):
        arr[i:i + min_run] = sorted(arr[i:i + min_run])
        _emit_state(arr, on_step, f"run sorted {i}:{min(i + min_run, n)}")

    size = min_run
    while size < n:
        for left in range(0, n, 2 * size):
            right = min(n, left + 2 * size)
            arr[left:right] = sorted(arr[left:right])
            _emit_state(arr, on_step, f"merge block {left}:{right}")
        size *= 2

    return arr


def cocktail_sort(arr, on_step=None):
    # How it works: bidirectional bubble sort; moves large items right on forward pass,
    # then small items left on backward pass.
    # Time complexity: best O(n), average/worst O(n^2).
    # Space complexity: O(1) auxiliary (in-place).
    n = len(arr)
    swapped = True
    start = 0
    end = n - 1
    _emit_state(arr, on_step, "start")

    while swapped:
        swapped = False

        for i in range(start, end):
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                swapped = True
                _emit_state(arr, on_step, f"forward swap {i}<->{i + 1}")

        if not swapped:
            break

        swapped = False
        end -= 1

        for i in range(end, start - 1, -1):
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                swapped = True
                _emit_state(arr, on_step, f"backward swap {i}<->{i + 1}")

        start += 1

    return arr


SORT_FUNCTIONS = [
    bubble_sort,
    selection_sort,
    insertion_sort,
    merge_sort,
    quick_sort,
    heap_sort,
    counting_sort,
    radix_sort,
    bucket_sort,
    shell_sort,
    tim_sort,
    cocktail_sort,
]


def _run_sort_with_callback(sort_fn, values, on_step):
    """Run a sort function while passing an optional visualization callback."""
    working = list(values)

    try:
        result = sort_fn(working, on_step=on_step)
    except TypeError:
        # Backward compatibility in case a function without on_step is passed in.
        result = sort_fn(working)

    if result is None:
        return working
    return result


def _render_terminal_frame(sort_name, state, step, note="", max_width=50):
    """Render one animation frame for a sorting algorithm in the terminal.

    Args:
        sort_name: Name of the current sorting function (shown in frame header).
        state: Current array snapshot to draw.
        step: Current animation step count.
        note: Optional short message describing what just happened.
        max_width: Maximum bar width in characters for the largest value.
    """
    clear_command = "cls" if os.name == "nt" else "clear"
    os.system(clear_command)

    print(f"{sort_name} | step {step}")
    if note:
        print(f"note: {note}")

    if not state:
        print("(empty)")
        return

    min_value = min(state)
    # Shift values so negatives/zeros still produce visible positive bar lengths.
    shifted_values = [value - min_value + 1 for value in state]
    max_shifted = max(shifted_values)

    for index, (value, shifted_value) in enumerate(zip(state, shifted_values)):
        proportion = (shifted_value / max_shifted) if max_shifted else 1
        bar_len = int(proportion * max_width)
        bar = "#" * max(1, bar_len)
        print(f"{index:>2}: {value:>6} | {bar}")


def visualize_sort(sort_fn, values, delay=0.08, max_width=50):
    """Visualize a single sort in real time in the terminal.

    Args:
        sort_fn: sorting function (for example bubble_sort).
        values: list of numbers to sort.
        delay: sleep time between frames in seconds.
        max_width: max ASCII bar width in characters.
    """
    step = {"count": 0}

    def on_step(state, note=""):
        step["count"] += 1
        _render_terminal_frame(sort_fn.__name__, state, step["count"], note, max_width=max_width)
        time.sleep(delay)

    result = _run_sort_with_callback(sort_fn, values, on_step)

    _render_terminal_frame(sort_fn.__name__, result, step["count"], "done", max_width=max_width)
    #print("\nSorted result:", result)
    return result


def run_sort(sort_fn, values):
    """Run a single sort without visualization and return only the final sorted result.

    Args:
        sort_fn: Sorting function to execute.
        values: Input list of numbers.
    """
    return _run_sort_with_callback(sort_fn, values, on_step=None)


def run_all_sorts(values):
    """Run all sorting functions without visualization.

    Args:
        values: Input list of numbers.

    Returns:
        dict[str, list[int|float]]: Mapping from function name to final sorted output.
    """
    results = {}
    for fn in SORT_FUNCTIONS:
        results[fn.__name__] = run_sort(fn, values)
    return results


def print_all_sort_results(values):
    """Run all sorts without animation and print final outputs."""
    results = run_all_sorts(values)
    for name, output in results.items():
        print(f"{name}: {output}")
    return results


def visualize_all_sorts(values, delay=0.08, pause_between=0.8, max_width=50):
    """Run and visualize all sorting functions in sequence.

    Args:
        values: Input list of numbers to visualize.
            Each sort receives its own copy, so the original input list is not mutated.
        delay: Time in seconds to wait between animation frames inside each sort.
            Larger values make the animation slower and easier to follow.
        pause_between: Time in seconds to pause after one sort finishes before the
            next sort starts.
        max_width: Maximum width (in characters) of each ASCII bar shown in the
            terminal visualization.
    """
    for fn in SORT_FUNCTIONS:
        visualize_sort(fn, values, delay=delay, max_width=max_width)
        time.sleep(pause_between)


if __name__ == "__main__":
    sample = [23, 5, 99, 1, 42, 17, 8, 64, 3, 50]

    # Non-visual usage examples (final result only):
    # print(run_sort(bubble_sort, sample))
    print_all_sort_results(sample)

    #visualize_all_sorts(sample, delay=0.5, pause_between=0.6, max_width=44)
