# Model the process people use to choose (or abandon) their seat in the waiting area
# The seat layout fits neatly on a grid. Each position is either floor (.), an empty seat (L), or an occupied seat (#). 
# People are predictable and follow a simple set of rules: all decisions are based on the number of occupied seats adjacent to a given seat 
# (one of the eight positions immediately up, down, left, right, or diagonal from the seat). 
# The following rules are applied to every seat simultaneously:

# If a seat is empty (L) and there are no occupied seats adjacent to it, the seat becomes occupied.
# If a seat is occupied (#) and four or more seats adjacent to it are also occupied, the seat becomes empty.
# Otherwise, the seat's state does not change.
# Floor (.) never changes; seats don't move, and nobody sits on the floor.

# PART ONE:
# At some point, something interesting happens: the chaos stabilizes and further applications of these rules cause no seats to change state! 
# Simulate your seating area by applying the seating rules repeatedly until no seats change state. 
# How many seats end up occupied?

input = File.readlines('11.txt').map {|line| line.chomp.split("")}

def duplicate(arr)
  return Marshal.load(Marshal.dump(arr))
end

def examine_seat(grid)

  copy = duplicate(grid)
  changed = false

  (0...grid.length).each do |row|
    (0...grid[0].length).each do |col|

      if grid[row][col] == "L" && valid_pos([row, col], grid) == 0
        copy[row][col] = "#"
        changed = true

      elsif grid[row][col] == "#" && valid_pos([row, col], grid) >= 4
        copy[row][col] = "L"
        changed = true
      end
    end
  end

  keep_looping(changed, copy)
end

def valid_pos(pos, grid)
  x, y = pos

  [x-1, x, x+1].product([y-1, y, y+1]).reject {|pos| pos == [x, y]}
  .select {|x, y| (0...grid.length).include?(x) && (0...grid[0].length).include?(y)}
  .count {|pos| grid[pos[0]][pos[1]] == '#'}
end

def keep_looping(changed, copy)
  if changed == true
    examine_seat(copy)
  else
    return copy.flatten.count {|pos| pos == '#'}
  end
end

p examine_seat(input)       # 2289

# PART TWO: 
# People don't just care about adjacent seats - they care about the first seat they can see in each of those eight directions!

# Now, instead of considering just the eight immediately adjacent seats, consider the first seat 
# in each of those eight directions. Also, it now takes five or more visible occupied seats for an occupied seat to become empty. 
# The other rules still apply: empty seats that see no occupied seats become occupied, seats matching no rule don't change, and floor never changes.

# Again, at some point, people stop shifting around and the seating area reaches equilibrium. 

# Given the new visibility method and the rule change for occupied seats becoming empty, once equilibrium is reached, 
# how many seats end up occupied?

def keep_looping(changed, copy)
  if changed == true
    part_two_seats(copy)
  else
    copy.flatten.count { |pos| pos == '#' }
  end
end

def part_two_seats(grid)
  copy = duplicate(grid)
  changed = false

  (0...grid.length).each do |row|
    (0...grid[0].length).each do |col|
      if grid[row][col] == 'L' && valid_pos([row, col], grid) == 0
        copy[row][col] = '#'
        changed = true

      elsif grid[row][col] == '#' && valid_pos([row, col], grid) >= 5
        copy[row][col] = 'L'
        changed = true
      end
    end
  end

  keep_looping(changed, copy)
end

def valid_pos(pos, grid)
  x, y = pos

  count = 0

  neighbors = [x-1, x, x+1].product([y-1, y, y+1])
  .reject { |pos| pos == [x, y] }
  .select {|x, y| (0...grid.length).include?(x) && (0...grid[0].length).include?(y)}
  .each do |pos|
    a, b = pos
  
    if (0...grid.length).include?(a) && (0...grid[0].length).include?(b) 
      if grid[a][b] == '.'
        count += 1 if keep_stepping([a, b], [x, y], grid)
      else
        count += 1 if grid[a][b] == '#'
      end
    end
  end

  count

end

def keep_stepping(pos, start, grid)
  a, b = pos
  x, y = start

  x_range = (0...grid.length)
  y_range = (0...grid[0].length)

  x_diff = x - a
  y_diff = y - b

  while grid[a][b] == '.' && x_range.include?(a) && y_range.include?(b)
    a -= x_diff
    b -= y_diff

    return false if !x_range.include?(a) || !y_range.include?(b)
  end

  grid[a][b] == '#'

end

p part_two_seats(input)     # 2059