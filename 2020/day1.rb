input = File.readlines('1.txt').join.split(/\n/).map(&:to_i)

def values(arr)
    # solve_first(arr, 2020)
    solve_second(arr, 2020)
end

def values(arr)
    adjusted = arr.split("\n").map {|num| num.to_i}                     
    # solve_first(adjusted, 2020)
    solve_second(adjusted, 2020 )
end

# RETURN PRODUCT OF TWO VALUES IN ARRAY THAT SUM == 2020                # RETURNS 1016964
def solve_first(arr, val)
    arr.each {|num| return [num, val-num] if arr.include?(val-num)}     # [954, 1066]. SWITCHED THIS TO INDIVIDUAL VALUES FOR PART 2 HELPER
end

# RETURN PRODUCT OF 3 VALUES THAT SUM == 2020
def solve_second(arr, val)                          
    nums = []
    arr.each_with_index do |num, i| 
        second, third = solve_first(arr[i..-1], val-num)                # DESTRUCTURED 
        if second > 0 && third > 0 && second != num && third != num
            # return [num, second, third]                               # [295, 509, 1216]
            return num * second * third                                 # 182588480
        end
    end
end

p values(input)