input = File.readlines('12.txt').map {|ele| ele.chomp}

# PART ONE. 
# navigation instructions consist of a sequence of single-character actions paired with integer input values. 

# Action N means to move north by the given value.
# Action S means to move south by the given value.
# Action E means to move east by the given value.
# Action W means to move west by the given value.
# Action L means to turn left the given number of degrees.
# Action R means to turn right the given number of degrees.
# Action F means to move forward by the given value in the direction the ship is currently facing.
# The ship starts by facing east. Only the L and R actions change the direction the ship is facing.

# Manhattan distance = sum of the absolute values of its east/west position and its north/south position.
# What is the Manhattan distance between where the navigation instructions lead and the ship's starting position?

def manhattan_distance(arr)
  x, y = [0, 0]
  pointed = [1, 0]
  directions = [[0, -1], [-1, 0], [0, 1], [1, 0]]

  arr.each do |dir|

    command = dir[0]
    num = dir[1..-1].to_i
    
    case command
      when /N/
        y -= num
      when /S/
        y += num
      when /E/
        x += num
      when /W/
        x -= num
      when /L/
        turn_count = num/90
        pointed = directions[(directions.index(pointed) + turn_count) % directions.length]
      when /R/
        turn_count = -num/90
        pointed = directions[(directions.index(pointed) + turn_count) % directions.length]
      when /F/
        x += num * pointed[0]
        y += num * pointed[1]
      end
  end

  x.abs + y.abs
end

p manhattan_distance(input)         # RETURNS 2297

# PART TWO: all of the actions actually indicate how to move a waypoint which is relative to the ship's position:

# Action N means to move the waypoint north by the given value.
# Action S means to move the waypoint south by the given value.
# Action E means to move the waypoint east by the given value.
# Action W means to move the waypoint west by the given value.
# Action L means to rotate the waypoint around the ship left (counter-clockwise) the given number of degrees.
# Action R means to rotate the waypoint around the ship right (clockwise) the given number of degrees.
# Action F means to move forward to the waypoint a number of times equal to the given value.

# Figure out where the navigation instructions actually lead. 
# What is the Manhattan distance between that location and the ship's starting position?

def waypoint_distance(arr)
  x, y = [0, 0]                 # ship
  wx, wy = [x + 10, y-1]        # waypoint coordinate. LOWER-RIGHT QUAD

  arr.each do |dir|

    command = dir[0]
    num = dir[1..-1].to_i
    
    case command
      when /N/
        wy -= num
      when /S/
        wy += num
      when /E/
        wx += num
      when /W/
        wx -= num
      when /L/
        turns = (-num + 360) % 360

        if turns == 90
            wx, wy = [-wy, wx]
        elsif turns == 180
            wx, wy = [-wx, -wy]
        elsif turns == 270
            wx, wy = [wy, -wx]
        end
      when /R/
        turns = (num + 360) % 360

        if turns == 90
            wx, wy = [-wy, wx]
        elsif turns == 180
            wx, wy = [-wx, -wy]
        elsif turns == 270
            wx, wy = [wy, -wx]
        end
      when /F/                      # ship MOVES TOWARD waypoint
        x += num * wx       
        y += num * wy
      end
  end

  x.abs + y.abs
end

# p waypoint_distance(input)        # RETURNS 89984