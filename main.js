var game_array = [-1, -1,-1,-1,
    -1,-1,-1,
    -1,-1,-1 ]; //This array is used for tracking game
var turn_count = 0,box_filled_count=0, mode = -1, game_complete =false, running= false;

function reset (n)
{
var temp = mode;
mode = -1;
game_array = [-1, -1,-1,-1,
   -1,-1,-1,
   -1,-1,-1 ]; 
turn_count = 0;
box_filled_count = 0;
game_complete = false;

var brush;
for(var i = 1;i<=9;i++)
{
brush = document.getElementById(i);
brush.src ="white.jpeg"
}
if(n==1)
change_mode(temp);

}
/* 
The game completes when game_complete = true
The game is in single player mode if mode = 0 and it is in two player mode if mode =1
var turn is used in two player mode 
*/
function change_mode(n){
mode = n;
document.getElementById("reset").innerHTML = `<button id="reset_button" class="choice_box" onclick="reset(1)">Reset</button><br><br><button id="back_button" class="choice_box" onclick ="back()"> Back </button>`;
if(mode == 1){
display_turn("Player 1");
}
else if(mode == 0){
display_turn("User");
}
}

function back()
{
reset(0);
document.getElementById("turn").innerHTML=`Select mode<br><br>          <button class="choice_box" onclick="change_mode(0)">Single player</button>          <button class="choice_box" onclick="change_mode(1)">Two players</button>`;
document.getElementById("reset").innerHTML="";

}
function display_turn(name){
if(game_complete == false){
const drop = document.getElementById("turn");
drop.textContent= `${name} turn`;
}
}
function choose_turn(number){
if(game_complete == false && game_array[number]==-1){
if (mode == 1){
if (turn_count%2 == 0){
fill_box("player 1",number);
display_turn("Player 2");
}
else if(turn_count%2 == 1){
fill_box("player2",number);
display_turn("Player 1");
}
turn_count++;
}
else if(mode == 0){
fill_box("user",number);
display_turn("Computer");
function sleep(ms){
return new Promise(resolve => setTimeout(resolve,ms));
}
if(game_complete==false)
{
sleep(700).then(() => { computer_turn();});
}
}
}

}

function computer_turn(){
var x = choose_box();
fill_box("computer",x);
display_turn("User");
}
function choose_box()
{
var positions_array =[], state="";
var positions = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
var win_pat = ["-100","0-10","00-1"], lose_pat = ["-111","1-11","11-1"];
for(var i in positions){
for(var j of positions[i]){
state += String(game_array[j]);
}
positions_array[i] = state;
state ="";
}

for(var i in positions_array)
{
for(var k in win_pat)
{
if(positions_array[i]==win_pat[k])
{
if (game_array[positions[i][0]]==-1){
x = positions[i][0];
}
else if (game_array[positions[i][1]]==-1){
x = positions[i][1];
}
else if (game_array[positions[i][2]]==-1){
x = positions[i][2];
}
return x;
}
}
}
for(var i in positions_array)
{
for(var k in lose_pat)
{
if(positions_array[i]==lose_pat[k])
{
if (game_array[positions[i][0]]==-1){
x = positions[i][0];
}
else if (game_array[positions[i][1]]==-1){
x = positions[i][1];
}
else if (game_array[positions[i][2]]==-1){
x = positions[i][2];
}
return x;
}
}
}
if(game_array[5] == -1)
{
x= 5;
}
else
{
if(game_array[1]==-1)
x=1;
else if(game_array[3]==-1)
x=3;
else if(game_array[7]==-1)
x=7;
else if(game_array[9]==-1)
x=9;
else{
if (game_array[2] == -1)
x = 2;
else if (game_array[4] == -1)
x = 4;
else if (game_array[6] == -1)
x = 6;
else if (game_araray[8] == -1)
x = 8;
}
}
return x;
}

function fill_box(player,number)
{
var winner ;
const brush = document.getElementById(number);
const drop = document.getElementById("turn");
if((game_array[number] == -1)&&(game_complete==false))
{
if(player=="player 1" || player =="user")
{
brush.src="cross.jpeg";
game_array[number]=1 ;
}

else if (player=="player2" || player=="computer")
{
brush.src="circle.jpeg";
game_array[number]=0;

}
box_filled_count++;
}

if(( game_array[1]==1 && game_array[2]==1 && game_array[3]==1) || 
( game_array[4]==1 && game_array[5]==1 && game_array[6]==1) ||
( game_array[7]==1 && game_array[8]==1 && game_array[9]==1) ||
( game_array[1]==1 && game_array[4]==1 && game_array[7]==1) ||
( game_array[2]==1 && game_array[5]==1 && game_array[8]==1) ||
( game_array[3]==1 && game_array[6]==1 && game_array[9]==1) ||
( game_array[1]==1 && game_array[5]==1 && game_array[9]==1) ||
( game_array[3]==1 && game_array[5]==1 && game_array[7]==1) )
{
if(mode==1)
winner="Player 1";
else
winner="User"; 
game_complete=true;
}
else if(( game_array[1]==0 && game_array[2]==0 && game_array[3]==0) || 
( game_array[4]==0 && game_array[5]==0 && game_array[6]==0) ||
( game_array[7]==0 && game_array[8]==0 && game_array[9]==0) ||
( game_array[1]==0 && game_array[4]==0 && game_array[7]==0) ||
( game_array[2]==0 && game_array[5]==0 && game_array[8]==0) ||
( game_array[3]==0 && game_array[6]==0 && game_array[9]==0) ||
( game_array[1]==0 && game_array[5]==0 && game_array[9]==0) ||
( game_array[3]==0 && game_array[5]==0 && game_array[7]==0) )
{
if(mode==1)
winner="Player 2";
else
winner="Computer"; 
game_complete = true;
}
if(game_complete==true)
{
drop.textContent = `${winner} won`;
}
else{
if(box_filled_count==9){
drop.textContent = "Draw";
game_complete = true;
}
}


}