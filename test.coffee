class Stuff
  constructor: (carac) ->
    {
      @name, @reqlvl = 1, @reqclass = null, @reqspecie = null, @for = 0,
      @formod = 0, @dex = 0, @dexmod = 0, @end = 0, @endmod = 0, @con = 0,
      @conmod = 0, @per = 0, @permod = 0, @pv = 0, @mana = 0
    } = carac

class Player
  constructor: (carac) ->
    {
      @name, @lvl = 1, @class, @specie = "Human", @x = 0, @y = 0, @equip = []
    } = carac
    i = 0
    cldef = {
      @cfor, @cformod, @cdex, @cdexmod, @cend, @cendmod, @ccon, @cconmod, @cper,
      @cpermod
    }
    rdef = {
      @rfor, @rformod, @rdex, @rdexmod, @rend, @rendmod, @rcon, @rconmod, @rper,
      @rpermod
    }
    tdef = {
      @tfor, @tformod, @tdex, @tdexmod, @tend, @tendmod, @tcon, @tconmod, @tper,
      @tpermod
    }
    switch @class
      when "Warrior"
        cldef = {cfor: 10, cformod: 3}
        @pvmod = 5
      when "Mage"
        cldef = {cfor: 4, cformod: 1}
        @pvmod = 2
      when "Hunter"
        cldef = {cfor: 8, cformod: 2}
        @pvmod = 4
      else
        cldef.forEach (item, idx) -> item = if idx %% 2 == 1 then 1 else 3
        @pvmod = 3
    switch @specie
      when "Human"
        rdef = {rfor: 10, rformod: 3}
      when "Dwarf"
        rdef = {rfor: 4, rformod: 1}
      when "Elf"
        rdef = {rfor: 8, rformod: 2}
      else
        rdef.forEach (item, idx) -> item = if idx %% 2 == 1 then 1 else 3
    tdef.forEach (item, idx) ->  item = rdef[idx] + cldef[idx] + (->
      @equip.forEach (eq) ->
        i += eq[idx]
      return i
    )
    @update()
    @pv = @pvmax
  move: (xm, ym) ->
    @x += (xm = 0)
    @y += (ym = 0)
  attack: (target, spe) ->
  introduce: ->
    console.log "#{@name} is a #{@specie} #{@class}, who is at lvl : #{@lvl}"
  update: ->
    i = 0
    oldpv = @pvmax
    @pvmax = 10 + @pvmod*@lvl*(((@tend+(@tendmod*3))**2)/200) + (->
      @equip.forEach (item, idx) ->
        i += item.pv
      return i)
    if @pvmax is oldpv then @pv=((@pv*@pvmax)//oldpv)
