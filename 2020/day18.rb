# "math" follows different rules. Puzzle input consists of a series of expressions that consist of 
# addition (+), multiplication (*), and parentheses ((...)). 
# Just like normal math, parentheses indicate that the expression inside must be evaluated before it can be used 
# by the surrounding expression. Addition still finds the sum of the numbers on both sides of the operator, 
# and multiplication still finds the product.

# However, the rules of operator precedence have changed. 
# Rather than evaluating multiplication before addition, the operators have the same precedence, 
# and are evaluated left-to-right regardless of the order in which they appear.

# PART ONE: Evaluate the expression on each line of the homework. What is the sum of the resulting values?

input = File.readlines('18.txt').map {|str| str.chomp}

class Integer                                                       # CHANGE RULES
  def -(operator)
    self * operator
  end

  def /(operator)
    self + operator
  end
end

p input.map {|line| eval(line.gsub('*', '-'))}.sum                  # RETURNS 50956598240016


# PART TWO: Now, addition and multiplication have different precedence levels, 
# but they're not the ones you're familiar with. Instead, addition is evaluated before multiplication.

p input.map {|line| eval(line.gsub('*', '-').gsub('+', '/'))}.sum   # RETURNS 535809575344339
------------------------------------------------------------------------------------------------------

# INTERESTING SOLUTION

# class Integer
#   alias_method :add, :+
#   alias_method :mult, :*

#   alias_method :*, :add
#   alias_method :+, :mult
# end

# p input.sum {|line| eval line.tr('+*', '*+')}
# 535809575344339