<footer class="content-info" role="contentinfo">
  <div class="container">
  <div class="row">
    <?php dynamic_sidebar('sidebar-footer'); ?>
  </div>
  </div>
    <div class="footer-copyright">
        <div class="container">
            © <?php  echo current_time( "Y", $gmt = 0 ); ?> <?php bloginfo('name'); ?>, All rights reserved.
        </div>
    </div>
</footer>
