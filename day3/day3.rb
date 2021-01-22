input = File.readlines('3.txt').join.split(/\n/)

# EVERY '#' IS A TREE. AND THIS GRID PATTERN CONTINUES RIGHTWARD FOREVER
# PART ONE: FIGURE OUT HOW MANY COLLISIONS THERE WILL BE GOING RIGHT 3 DOWN 1
# PART TWO: FIGURE OUT PRODUCT OF COLLISIONS FROM GOING RIGHT 1 DOWN 1, RIGHT 3 DOWN 1, RIGHT 5 DOWN 1,  RIGHT 7 DOWN 1, RIGHT 1 DOWN 2

def make_grid(input)
    new_grid = input.map {|line| line.split("")}
    solve_collisions(new_grid)                                                      # PART ONE. RETURNS 276
    # p new_grid.length # 323                                                       # GRID LENGTH IS 323
    # p new_grid[0].length #31                                                      # PATTERN IS LENGTH 31 BUT REPEATS
    solve_product_collisions(["r1d1", "r3d1", "r5d1", "r7d1", "r1d2"], new_grid)    # PART TWO. RETURNS 7812180000
end

def solve_collisions(grid)
    x, y = 0, 0

    count = 0

    while x < grid.length 

        count += 1 if grid[x][y] == "#"

        # p "row is #{x}"
        # p "col is #{y}"
        # p "current count is #{count}"         # SANITY CHECK
        x += 1
        y = ((y + 3) % 31)
    end
    count                             
end

def open_val_solve_collisions(right_shift, down_shift, grid)
    x, y = 0, 0
    count = 0

    while x < grid.length 

        count += 1 if grid[x][y] == "#"

        x += down_shift
        y = ((y + right_shift) % 31)        
    end
    count
end

def solve_product_collisions(arr, grid)
    product = 1
    arr.each do |string_pair| 
        right_shift, down_shift = string_pair.split("d")
        right_shift = right_shift[1..-1].to_i
        down_shift = down_shift.to_i
        
        product *= open_val_solve_collisions(right_shift, down_shift, grid)
    end
    product                     
end

# p make_grid(input)